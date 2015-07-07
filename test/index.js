var chai = require('chai');
var arrayTest = require('..');
var expect = chai.expect;


function mkArray()
{
   var testArray = new Int32Array(36594368);
   var i = 0;

   for (var xi = 0; xi < 332; xi++) {
       for (var yi = 0; yi < 332; yi++) {
           for (var zi = 0; zi < 332; zi++) {
               if ((xi + yi + zi) % 62 == 0) testArray[i] = 2;
               else if (yi < 16) testArray[i] = 2;
               else if (yi == 16) testArray[i] = 1;
               else testArray[i] = 0;

               i++;
           }
       }
   }
   
   return testArray;
}

describe('Performance Tests',function()
{
   it('via javascript',function()
   {
      var a = mkArray();

      expect(a.length).to.equal(36594368);
   });
   
   it('via c++',function()
   {
      var a = arrayTest.mkArray();

      expect(a.length).to.equal(36594368);
   });

   it('to be the same',function()
   {
      var a = mkArray();
      var b = arrayTest.mkArray();

      for(i = 0;i < a.length;i++) 
      {
         if(a[i] != b[i]) break;
      }

      expect(i).to.equal(36594368);
   });

});
