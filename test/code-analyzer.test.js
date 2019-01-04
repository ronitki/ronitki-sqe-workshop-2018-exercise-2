import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {parser} from '../src/js/code-analyzer';
import {getAns} from '../src/js/code-analyzer';
import {clearTable} from '../src/js/code-analyzer';
import {substitution} from '../src/js/code-substitution';
import {getArray} from '../src/js/code-substitution';
import {getFunc1} from '../src/js/code-substitution';



describe('The javascript parser', () => {
    it('1', () => {

        let parsedcode = parseCode('function foo(x){return x;}');
        clearTable();
        parser(parsedcode.body);

        getFunc1();
        substitution('6');
        let func=getArray();
        assert.equal(func[0],'function foo(x){ ');
    });
    it('2', () => {

        let parsedcode = parseCode('let c=9;\n' +
            'function foo(x,y){\n' +
            'let a=x+c;\n' +
            'if(y<a){\n' +
            'return a;\n' +
            '}\n' +
            'else{\n' +
            'return y;\n' +
            '}\n' +
            '}');
        clearTable();
        parser(parsedcode.body);


        substitution('1,6');
        let func=getArray();
        assert.equal(func[2],' \t\t<span style="background-color:lightgreen;">if(( y < ( x + c )  ) ){ </span>');
    });
    it('3', () => {

        let parsedcode = parseCode('let c=9;\n' +
            'let temp =3;\n' +
            'function foo(x,y){\n' +
            'while(x<y){\n' +
            'x=x+1;\n' +
            '}\n' +
            'return x;\n' +
            '}\n');
        clearTable();
        parser(parsedcode.body);


        substitution('1,6');
        let func=getArray();
        assert.equal(func[0],'let c = 9;');
        assert.equal(func[6],'\t\treturn x ;');

    });
    it('4', () => {
        let parsedcode = parseCode('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    while (a < z) {\n' +
            '        c = a + b;\n' +
            '        z = c * 2;\n' +
            '    }\n' +
            '    \n' +
            '    return z;\n' +
            '}\n');
        clearTable();
        parser(parsedcode.body);


        substitution('1,2,3');
        let func = getArray();
        assert.equal(func[1], ' \t\twhile(( ( x + 1 )  < z ) ){ ');
        assert.equal(func[4], '\t\treturn z ;');
    });

    it('5', () => {

        let parsedcode = parseCode('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            'a=a+1;\n' +
            '    \n' +
            '    while (a < z) {\n' +
            '        c = a + b;\n' +
            '        z = c * 2;\n' +
            '    }\n' +
            '    \n' +
            '    return z;\n' +
            '}\n');
        clearTable();
        parser(parsedcode.body);


        substitution('1,2,3');
        let func = getArray();
        assert.equal(func[1], ' \t\twhile(( ( ( x + 1 )  + 1 )  < z ) ){ ');
        assert.equal(func[2], '\t\t\tz = ( ( ( ( x + 1 )  + 1 )  + ( ( x + 1 )  + y )  )  * 2 ) ;');
    });
    it('6', () => {

        let parsedcode = parseCode('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            '}\n');
        clearTable();
        parser(parsedcode.body);


        substitution('1,2,3');
        let func = getArray();
        assert.equal(func[1], ' \t\t<span style="background-color:lightcoral;">if(( ( ( x + 1 )  + y )  < z ) ){ </span>');
        assert.equal(func[4], '\t\t<span style="background-color:lightgreen;">else if(( ( ( x + 1 )  + y )  < ( z * 2 ) ) ){ </span>');
    });
    it('7', () => {

        let parsedcode = parseCode('function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            'c=a+4;\n' +
            '    \n' +
            '    if (b < c) {\n' +
            '        c = c + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (c < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            '}');
        clearTable();
        parser(parsedcode.body);


        substitution('1,2,1');
        let func = getArray();
        assert.equal(func[1], ' \t\t<span style="background-color:lightgreen;">if(( ( ( x + 1 )  + y )  < ( ( x + 1 )  + 4 )  ) ){ </span>');
        assert.equal(func[4], '\t\t<span style="background-color:lightcoral;">else if(( ( ( x + 1 )  + 4 )  < ( z * 2 ) ) ){ </span>');
    });
    it('8', () => {

        let parsedcode = parseCode('function f(x){\n' +
            'if(x=="hi"){\n' +
            'return x;}}');
        clearTable();
        parser(parsedcode.body);


        substitution('"hi"');
        let func = getArray();
        assert.equal(func[1], ' \t\t<span style="background-color:lightgreen;">if(( x == hi ) ){ </span>');
    });

    it('9', () => {

        let parsedcode = parseCode('function foo(array){\n' +
            'let a= array[0];\n' +
            'if(a==2){\n' +
            'return a+2;\n' +
            '}}');
        clearTable();
        parser(parsedcode.body);


        substitution('[2,3]');
        let func = getArray();
        assert.equal(func[1], ' \t\t<span style="background-color:lightgreen;">if(( array[0]  == 2 ) ){ </span>');
        assert.equal(func[2], '\t\t\treturn ( array[0]  + 2 ) ;');

    });
    it('10', () => {

        let parsedcode = parseCode('function foo(array){\n' +
            'let a= array[0];\n' +
            'if(a==2){\n' +
            'return a+2;\n' +
            '}}');
        clearTable();
        parser(parsedcode.body);


        substitution('[2]');
        let func = getArray();
        assert.equal(func[1], ' \t\t<span style="background-color:lightgreen;">if(( array[0]  == 2 ) ){ </span>');
        assert.equal(func[2], '\t\t\treturn ( array[0]  + 2 ) ;');

    });
    it('11', () => {

        let parsedcode = parseCode('function foo(arr1,x,y,arr2){\n' +
            '    while(arr1[0]){\n' +
            '        if(y>0){\n' +
            '            y=arr2[1]+1;\n' +
            '            if(y>10){\n' +
            '                x=3;\n' +
            '            }\n' +
            '        }\n' +
            '        else{\n' +
            '            x=x+\'bye\';\n' +
            '        }\n' +
            '        c=arr1[1];\n' +
            '        z=c*2;\n' +
            '    }\n' +
            '    return z;\n' +
            '}');
        clearTable();
        parser(parsedcode.body);


        substitution('[true,3],\'hello\',0,[4,10]');
        let func = getArray();
        assert.equal(func[1], ' \t\twhile(arr1[0] ){ ');
        assert.equal(func[2], '\t\t\t<span style="background-color:lightcoral;">if(( y > 0 ) ){ </span>');
        assert.equal(func[4], '\t\t\t\t<span style="background-color:lightgreen;">if(( ( arr2[1] + 1 )  > 10 ) ){ </span>');

    });
    it('12', () => {

        let parsedcode = parseCode('function foo(x,y){\n' +
            'let a=[1,2,3];\n' +
            'let m;\n' +
            'm=a[1];\n' +
            'if(m==2){\n' +
            'return -1;\n' +
            '}\n' +
            '}\n');
        clearTable();
        parser(parsedcode.body);


        substitution('1,2');
        let func = getArray();
        assert.equal(func[1], ' \t\t<span style="background-color:lightgreen;">if(( 2  == 2 ) ){ </span>');


    });
    it('is parsing a function declaration correctly', () => {
        let parsedcode=parseCode('function BinarySearch(x,y){}');
        clearTable();
        parser(parsedcode.body);
        let actual=getAns();
        assert.equal(actual[1].Name,'x'
        );
    });
    it('is parsing a function declaration correctly', () => {
        let parsedcode=parseCode('function BinarySearch(x,y){}');
        clearTable();
        parser(parsedcode.body);
        let actual=getAns();
        assert.equal(actual[1].Name,'x'
        );
    });

    it('is parsing a variable declaration correctly', () => {
        let parsedcode=parseCode('let high=3,low,a=[1,2,x];');
        clearTable();
        parser(parsedcode.body);
        let actual=getAns();
        assert.equal(actual[0].Line,'1');
        assert.equal(actual[1].Type,'Variable Declaration');
        assert.equal(actual[2].Name,'a');
        assert.equal(actual[2].Value,'[1,2,x]');
    });

    it('is parsing a assignment expression correctly', () => {
        clearTable();
        let parsedcode=parseCode('low = 4');
        parser(parsedcode.body);
        let actual=getAns();
        assert.equal(actual[0].Line,'1');
        assert.equal(actual[0].Type,'Assignment Expression');
        assert.equal(actual[0].Name,'low');
        assert.equal(actual[0].Value,'4');
    });

    it('is parsing a assignment expression correctly', () => {
        clearTable();
        let parsedcode=parseCode('x = n-2 ; i++;');
        parser(parsedcode.body);
        let actual=getAns();
        assert.equal(actual[0].Line,'1');
        assert.equal(actual[0].Type,'Assignment Expression');
        assert.equal(actual[0].Name,'x');
        assert.equal(actual[0].Value,'( n - 2 )');
        assert.equal(actual[1].Line,'2');
        assert.equal(actual[1].Type,'Update Expression');
        assert.equal(actual[1].Name,'i');
        assert.equal(actual[1].Value,'i ++');

    });
    it('is parsing a while statement correctly', () => {
        clearTable();
        let parsedcode=parseCode('while (low <= high){}');
        parser(parsedcode.body);
        let actual=getAns();
        assert.equal(actual[0].Line,'1');
        assert.equal(actual[0].Type,'While Statement');

        assert.equal(actual[0].Condition,'( low <= high )');
    });

    it('is parsing a if/ifelse/else statement correctly', () => {
        clearTable();
        let parsedcode=parseCode(' if (X < V[mid]) high = mid - 1; else if (X > V[mid]) low = mid + 1; else x=2;');
        parser(parsedcode.body);
        let actual=getAns();
        assert.equal(actual[0].Line,'1');
        assert.equal(actual[2].Line,'2');
        assert.equal(actual[4].Line,'4');
        assert.equal(actual[0].Condition,'( X < V[mid] )');
        assert.equal(actual[3].Condition,'( X > V[mid] )');
    });


    it('is parsing a return statement correctly', () => {
        clearTable();
        let parsedcode=parseCode(' function binarySearch(X, V, n){ return mid=x+2; }');
        parser(parsedcode.body);
        let actual=getAns();
        assert.equal(actual[4].Line,'2');
        assert.equal(actual[4].Type,'Return Statement');
        assert.equal(actual[4].Value,'mid = ( x + 2 )');
    });

    it('is parsing a simple for statement correctly', () => {
        clearTable();
        let parsedcode=parseCode(' for (var i=0; i<10; i=i+1){}');
        parser(parsedcode.body);
        let actual=getAns();
        assert.equal(actual[0].Line,'1');
        assert.equal(actual[0].Name,'i');
        assert.equal(actual[1].Type,'For Statement');
        assert.equal(actual[1].Condition,'( i < 10 )');
    });

    it('is parsing a logical for statement correctly', () => {
        clearTable();
        let parsedcode=parseCode(' for (var i=0, j=2; i<10 && x<8 ; i=i+1){}');
        parser(parsedcode.body);
        let actual=getAns();
        assert.equal(actual[0].Line,'1');
        assert.equal(actual[0].Name,'i');
        assert.equal(actual[2].Type,'For Statement');
        assert.equal(actual[2].Condition,'( i < 10 ) && ( x < 8 )');
    });

    it('is parsing a unary return statement correctly', () => {
        clearTable();
        let parsedcode=parseCode(' function binarySearch(){ return -1; }');
        parser(parsedcode.body);
        let actual=getAns();
        assert.equal(actual[1].Line,'2');
        assert.equal(actual[1].Type,'Unary Expression');
        assert.equal(actual[1].Value,'- 1');
    });

    ('is parsing a Member Expression correctly', () => {
        clearTable();
        let parsedcode=parseCode('array[3]=V[min]; }');
        parser(parsedcode.body);
        let actual=getAns();
        assert.equal(actual[0].Line,'1');
        assert.equal(actual[0].Type,'Assignment Expression');
        assert.equal(actual[0].Value,'V[min]');
        assert.equal(actual[0].Name,'array[3]');
    });

    it('is parsing a complex update for statement correctly', () => {
        clearTable();
        let parsedcode=parseCode(' for (var i=0; i<10; i=i+1, j++){}');
        parser(parsedcode.body);
        let actual=getAns();
        assert.equal(actual[0].Line,'1');
        assert.equal(actual[0].Name,'i');
        assert.equal(actual[1].Type,'For Statement');
        assert.equal(actual[1].Condition,'( i < 10 )');
        assert.equal(actual[2].Line,'1');
        assert.equal(actual[2].Name,'i');
        assert.equal(actual[2].Type,'Assignment Expression');
        assert.equal(actual[2].Value,'( i + 1 )');
        assert.equal(actual[3].Line,'1');
        assert.equal(actual[3].Name,'j');
        assert.equal(actual[3].Type,'Update Expression');
        assert.equal(actual[3].Value,'j ++');
    });





});