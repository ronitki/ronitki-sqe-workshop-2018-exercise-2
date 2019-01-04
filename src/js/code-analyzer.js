import * as esprima from 'esprima';

let ans=[];
let wasElse=false;

let line=0;
const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse);
};

const funcDec=(code,i)=>{
    var obj={
        Line:line,
        Type:'Function Declaration',
        Name:code[i].id.name,
        Condition:'' ,
        Value:''};
    ans.push(obj);
    for(var j=0;j<code[i].params.length; j++ ){
        var obj1={
            Line:line,
            Type:'Variable Declaration',
            Name: code[i].params[j].name,
            Condition:'' ,
            Value:  ''
        };
        ans.push(obj1);
    }
    parser(code[i].body);
};


const variDec= (code ,i)=>{
    for(var j=0;j<code[i].declarations.length; j++ ){
        var v='';
        if( code[i].declarations[j].init!=null)
            v=assignmentValue(code[i].declarations[j].init);
        var obj={
            Line:line,
            Type:'Variable Declaration',
            Name: code[i].declarations[j].id.name,
            Condition:'',
            Value:v
        };

        ans.push(obj);
    }
};

const expStat=(code,i)=>{
    if(code[i].expression.type=='UpdateExpression'){
        var obj = {
            Line: line,
            Type: 'Update Expression',
            Name: assignmentValue(code[i].expression.argument),
            Condition: '',
            Value: assignmentValue(code[i].expression)};
        ans.push(obj);}
    else {
        var obj1 = {
            Line: line,
            Type: 'Assignment Expression',
            Name: assignmentValue(code[i].expression.left),
            Condition: '',
            Value: assignmentValue(code[i].expression.right)};
        ans.push(obj1);}
};

const whileStat=(code,i)=>{
    var obj={
        Line:line,
        Type:'While Statement',
        Name: '',
        Condition:getForCondition(code[i].test) ,
        Value: ''
    };
    ans.push(obj);
    parser(code[i].body);
    var obj1={
        Line:line,
        Type:'End of While',
        Name: '',
        Condition:'',
        Value: ''

    };
    ans.push(obj1);
};

const ifStat=(code,i)=>{
    wasElse=false;
    var obj={
        Line:line, Type:'If Statement', Name: '', Condition:getForCondition(code[i].test) , Value: ''};
    ans.push(obj);
    parser(code[i].consequent);
    var obj1={
        Line:line, Type:'End of If', Name: '', Condition:'', Value: ''};
    ans.push(obj1);
    ifType(code[i]);
    if(code[i].alternate!=null) {
        parser(code[i].alternate);
        if(wasElse){
            var obj2={Line:line, Type:'End of Else', Name: '', Condition:'', Value: ''};ans.push(obj2);

        }
    }
    wasElse=false;

};

const ifElseStat=(code,i)=>{
    wasElse=false;
    var obj={Line:line, Type:'ElseIf Statement', Name: '', Condition:getForCondition(code[i].test) , Value: ''};
    ans.push(obj);
    parser(code[i].consequent);
    var obj1={Line:line, Type:'End of ElseIf', Name: '', Condition:'', Value: ''};
    ans.push(obj1);
    ifType(code[i]);
    if(code[i].alternate!=null) {
        parser(code[i].alternate);
        if(wasElse){
            var obj2={Line:line, Type:'End of Else', Name: '', Condition:'', Value: ''};
            ans.push(obj2);
        }
    }
    wasElse=false;
};

const retStat=(code,i)=>{
    var obj={
        Line:line,
        Type:'Return Statement',
        Name: '',
        Condition:'' ,
        Value: assignmentValue(code[i].argument)

    };
    ans.push(obj);
};

const forStat=(code,i)=>{
    var obj={
        Line:line,
        Type:'For Statement',
        Name: '',
        Condition:getForCondition(code[i].test),
        Value: getInit(code[i].init)

    };
    ans.push(obj);
    if(code[i].update!=null){
        parseUpdate(code[i].update,i);
    }
    parser(code[i].body);
};



const parser= (code) =>{
    if(code.type=='BlockStatement'){parser(code.body);}
    else{
        if(typeof code.length == 'undefined'){
            code=[code];
        }
        for(var i=0;i<code.length; i++){
            line++;
            if(code[i].type=='FunctionDeclaration'){
                funcDec(code ,i);}
            // if(code[i].type=='VariableDeclaration'){
            //     variDec(code,i);}
            parserPart2(code,i);
        }}
};
const parserPart2 = (code,i)=>{
    if(code[i].type=='VariableDeclaration'){
        variDec(code,i);}
    if(code[i].type=='ExpressionStatement'){
        expStat(code,i);}
    if(code[i].type=='WhileStatement'){
        whileStat(code,i);}
    if(code[i].type=='IfStatement'){ifStat(code,i);
    }
    parserPart3(code,i);
};

const parserPart3=(code,i)=>{
    if(code[i].type=='ElseIfStatement'){
        ifElseStat(code,i);}
    if(code[i].type=='ReturnStatement'){
        retStat(code,i);}
    if(code[i].type=='ForStatement'){
        forStat(code,i);}
};
const assignmentValue = (exp)=>{

    if(exp.type=='Literal'){
        return exp.value;}
    else if(exp.type=='Identifier'){
        return exp.name;}
    else if(exp.type=='BinaryExpression'){
        return ('( '+assignmentValue(exp.left)+' '+exp.operator+' '+assignmentValue(exp.right)+' )');
    }
    else if(exp.type=='MemberExpression'){
        return (assignmentValue(exp.object)+'['+assignmentValue(exp.property)+']');}
    return     assignmentValuePart2(exp);

};

const assignmentValuePart2 = (exp)=>{

    if (exp.type == 'AssignmentExpression') {
        return (assignmentValue(exp.left) + ' ' + exp.operator + ' ' + assignmentValue(exp.right));
    }
    else if (exp.type == 'UpdateExpression') {
        return (assignmentValue(exp.argument) + ' ' + exp.operator);
    }
    else if (exp.type == 'UnaryExpression') {
        unaryStatement(exp);
        return (exp.operator + ' ' + assignmentValue(exp.argument));
    }
    else if(exp.type=='ArrayExpression'){
        return arrayParser(exp);
    }

};

const arrayParser=(exp)=>{
    let array='[';
    for(var i=0; i<exp.elements.length; i++){
        array=array+assignmentValue(exp.elements[i]);
        if(i!=exp.elements.length-1)
            array=array+',';
    }
    array=array+']';
    return array;
};

const ifType= (exp) =>{
    if( exp.alternate!=null){
        if(exp.alternate.test!=null)
            exp.alternate.type='ElseIfStatement';
        else{
            wasElse=true;
            line++;
            var obj={Line:line, Type:'Else Statement', Name: '', Condition:'' , Value:''
            };
            ans.push(obj);

        }
    }

};

const getInit=(exp)=>{
    var init='';
    for(var i=0; i<exp.declarations.length;i++){
        if(exp.declarations[i].type=='VariableDeclarator'){
            var obj={
                Line:line,
                Type:'Variable Declaration',
                Name: exp.declarations[i].id.name,
                Condition:'' ,
                Value: exp.declarations[i].init.value

            };
            ans.push(obj);
            init+=exp.declarations[i].id.name+'='+exp.declarations[i].init.value+',';
        }

    }
    return init;
};
const  parseUpdate=(exp,j)=>{
    if(typeof exp.expressions!= 'undefined') {
        for (var i = 0; i < exp.expressions.length; i++) {

            AssiStat(exp.expressions[i], j);

        }
    }
    else
        AssiStat(exp);
};
const AssiStat=(code)=>{
    if(code.type=='UpdateExpression'){
        var obj = {
            Line: line,
            Type: 'Update Expression',
            Name: assignmentValue(code.argument),
            Condition: '',
            Value: assignmentValue(code)
        };
        ans.push(obj);}
    else {
        var obj1 = {
            Line: line,
            Type: 'Assignment Expression',
            Name: assignmentValue(code.left),
            Condition: '',
            Value: assignmentValue(code.right)};
        ans.push(obj1);}

};
const getForCondition=(exp)=>{

    if(exp.type=='LogicalExpression'){
        return (getForCondition(exp.left)+' '+exp.operator+' '+getForCondition(exp.right));
    }
    else{
        return assignmentValue(exp);
    }
};

const getAns=()=>{
    return ans;
};

const clearTable=()=>{
    ans=[];
    line=0;
};

const unaryStatement=(exp)=>{
    var obj={
        Line:line,
        Type:'Unary Expression',
        Name: '',
        Condition:'' ,
        Value: (exp.operator+' '+assignmentValue(exp.argument))

    };
    ans.push(obj);

};




export {parseCode};
export {parser};
export {getAns};
export {clearTable};


