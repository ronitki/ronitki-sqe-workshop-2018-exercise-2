// import assert from 'assert';
// import {parseCode} from '../src/js/code-analyzer';
// import {parser} from '../src/js/code-analyzer';
// import {clearTable} from '../src/js/code-analyzer';
// import {substitution} from '../src/js/code-substitution';
// import {getArray} from '../src/js/code-substitution';
//
//
// describe('The javascript parser', () => {
//
//     it('is parsing a function declaration correctly', () => {
//         let string='function foo(x){' +
//             'let a=x+1;' +
//             'if(x<a){' +
//             'return a;' +
//             '}' +
//             '}';
//         let parsedcode = parseCode(string);
//         clearTable();
//         parser(parsedcode.body);
//         substitution('6');
//         let func=getArray();
//         assert.equal(func[0],'function foo(x){ ');
//     });
// });
// // import assert from 'assert';
// // // import {parseCode} from '../src/js/code-analyzer';
// // // import {parser} from '../src/js/code-analyzer';
// // // //import {getAns} from '../src/js/code-analyzer';
// // // import {clearTable} from '../src/js/code-analyzer';
// // // import {substitution} from '../src/js/code-substitution';
// // // import {getFunc1} from '../src/js/code-substitution';
// //
// // describe('The javascript parser', () => {
// //     it('is parsing a function declaration correctly', () => {
// //
// //         let x='hi';
// //         assert(x, 'hi');
// //     });
// //
// //     //     let parsedcode = parseCode('function foo(x, y, z){\n' +
// //     //         '    let a = x + 1;\n' +
// //     //         '    let b = a + y;\n' +
// //     //         '    let c = 0;\n' +
// //     //         '    \n' +
// //     //         '    if (b < z) {\n' +
// //     //         '        c = c + 5;\n' +
// //     //         '        return x + y + z + c;\n' +
// //     //         '    } else if (b < z * 2) {\n' +
// //     //         '        c = c + x + 5;\n' +
// //     //         '        return x + y + z + c;\n' +
// //     //         '    } else {\n' +
// //     //         '        c = c + z + 5;\n' +
// //     //         '        return x + y + z + c;\n' +
// //     //         '    }\n' +
// //     //         '}\n');
// //     //     clearTable();
// //     //     parser(parsedcode.body);
// //     //     substitution('');
// //     //     let func=getFunc1();
// //     //     assert.equal(func, 'function foo(x,y,z){ \n' +
// //     //         ' \t\tif(( ( ( x + 1 )  + y )  < z ) ){ \n' +
// //     //         '\t\t\treturn ( ( ( x + y ) + z ) + ( 0  + 5 )  ) ;\n' +
// //     //         '\t\t}\n' +
// //     //         '\t\telse if(( ( ( x + 1 )  + y )  < ( z * 2 ) ) ){ \n' +
// //     //         '\t\t\treturn ( ( ( x + y ) + z ) + ( ( 0  + x ) + 5 )  ) ;\n' +
// //     //         '\t\t}\n' +
// //     //         '\t\telse{ \n' +
// //     //         '\t\t\treturn ( ( ( x + y ) + z ) + ( ( 0  + z ) + 5 )  ) ;\n' +
// //     //         '\t\t}\n' +
// //     //         '\t}');
// //     // });
// //
// //
// // });
// /import assert from 'assert';
// import {parseCode} from '../src/js/code-analyzer';
// import {parser} from '../src/js/code-analyzer';
// import {getAns} from '../src/js/code-analyzer';
// import {clearTable} from '../src/js/code-analyzer';
//
//
// describe('The javascript parser', () => {
//     it('is parsing a function declaration correctly', () => {
//         let parsedcode=parseCode('function BinarySearch(x,y){}');
//         clearTable();
//         parser(parsedcode.body);
//         let actual=getAns();
//         assert.equal(actual[1].Name,'x'
//         );
//     });
//
//     it('is parsing a variable declaration correctly', () => {
//         let parsedcode=parseCode('let high=3,low,a=[1,2,x];');
//         clearTable();
//         parser(parsedcode.body);
//         let actual=getAns();
//         assert.equal(actual[0].Line,'1');
//         assert.equal(actual[1].Type,'Variable Declaration');
//         assert.equal(actual[2].Name,'a');
//         assert.equal(actual[2].Value,'[1,2,x]');
//     });
//
//     it('is parsing a assignment expression correctly', () => {
//         clearTable();
//         let parsedcode=parseCode('low = 4');
//         parser(parsedcode.body);
//         let actual=getAns();
//         assert.equal(actual[0].Line,'1');
//         assert.equal(actual[0].Type,'Assignment Expression');
//         assert.equal(actual[0].Name,'low');
//         assert.equal(actual[0].Value,'4');
//     });
//
//     it('is parsing a assignment expression correctly', () => {
//         clearTable();
//         let parsedcode=parseCode('x = n-2 ; i++;');
//         parser(parsedcode.body);
//         let actual=getAns();
//         assert.equal(actual[0].Line,'1');
//         assert.equal(actual[0].Type,'Assignment Expression');
//         assert.equal(actual[0].Name,'x');
//         assert.equal(actual[0].Value,'n - 2');
//         assert.equal(actual[1].Line,'2');
//         assert.equal(actual[1].Type,'Update Expression');
//         assert.equal(actual[1].Name,'i');
//         assert.equal(actual[1].Value,'i ++');
//
//     });
//     it('is parsing a while statement correctly', () => {
//         clearTable();
//         let parsedcode=parseCode('while (low <= high){}');
//         parser(parsedcode.body);
//         let actual=getAns();
//         assert.equal(actual[0].Line,'1');
//         assert.equal(actual[0].Type,'While Statement');
//
//         assert.equal(actual[0].Condition,'low <= high');
//     });
//
//     it('is parsing a if/ifelse/else statement correctly', () => {
//         clearTable();
//         let parsedcode=parseCode(' if (X < V[mid]) high = mid - 1; else if (X > V[mid]) low = mid + 1; else x=2;');
//         parser(parsedcode.body);
//         let actual=getAns();
//         assert.equal(actual[0].Line,'1');
//         assert.equal(actual[2].Line,'3');
//         assert.equal(actual[4].Line,'5');
//         assert.equal(actual[0].Condition,'X < V[mid]');
//         assert.equal(actual[2].Condition,'X > V[mid]');
//     });
//
//
//     it('is parsing a return statement correctly', () => {
//         clearTable();
//         let parsedcode=parseCode(' function binarySearch(X, V, n){ return mid=x+2; }');
//         parser(parsedcode.body);
//         let actual=getAns();
//         assert.equal(actual[4].Line,'2');
//         assert.equal(actual[4].Type,'Return Statement');
//         assert.equal(actual[4].Value,'mid = x + 2');
//     });
//
//     it('is parsing a simple for statement correctly', () => {
//         clearTable();
//         let parsedcode=parseCode(' for (var i=0; i<10; i=i+1){}');
//         parser(parsedcode.body);
//         let actual=getAns();
//         assert.equal(actual[0].Line,'1');
//         assert.equal(actual[0].Name,'i');
//         assert.equal(actual[1].Type,'For Statement');
//         assert.equal(actual[1].Condition,'i < 10');
//     });
//
//     it('is parsing a logical for statement correctly', () => {
//         clearTable();
//         let parsedcode=parseCode(' for (var i=0, j=2; i<10 && x<8 ; i=i+1){}');
//         parser(parsedcode.body);
//         let actual=getAns();
//         assert.equal(actual[0].Line,'1');
//         assert.equal(actual[0].Name,'i');
//         assert.equal(actual[2].Type,'For Statement');
//         assert.equal(actual[2].Condition,'i < 10 && x < 8');
//     });
//
//     it('is parsing a unary return statement correctly', () => {
//         clearTable();
//         let parsedcode=parseCode(' function binarySearch(){ return -1; }');
//         parser(parsedcode.body);
//         let actual=getAns();
//         assert.equal(actual[1].Line,'2');
//         assert.equal(actual[1].Type,'Unary Expression');
//         assert.equal(actual[1].Value,'- 1');
//     });
//
//     ('is parsing a Member Expression correctly', () => {
//         clearTable();
//         let parsedcode=parseCode('array[3]=V[min]; }');
//         parser(parsedcode.body);
//         let actual=getAns();
//         assert.equal(actual[0].Line,'1');
//         assert.equal(actual[0].Type,'Assignment Expression');
//         assert.equal(actual[0].Value,'V[min]');
//         assert.equal(actual[0].Name,'array[3]');
//     });
//
//     it('is parsing a complex update for statement correctly', () => {
//         clearTable();
//         let parsedcode=parseCode(' for (var i=0; i<10; i=i+1, j++){}');
//         parser(parsedcode.body);
//         let actual=getAns();
//         assert.equal(actual[0].Line,'1');
//         assert.equal(actual[0].Name,'i');
//         assert.equal(actual[1].Type,'For Statement');
//         assert.equal(actual[1].Condition,'i < 10');
//         assert.equal(actual[2].Line,'1');
//         assert.equal(actual[2].Name,'i');
//         assert.equal(actual[2].Type,'Assignment Expression');
//         assert.equal(actual[2].Value,'i + 1');
//         assert.equal(actual[3].Line,'1');
//         assert.equal(actual[3].Name,'j');
//         assert.equal(actual[3].Type,'Update Expression');
//         assert.equal(actual[3].Value,'j ++');
//     });
//
//
// });
//
//
//
