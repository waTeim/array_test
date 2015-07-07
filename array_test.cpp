#include <iostream>
#include <v8.h>
#include <node.h>
#include <node_buffer.h>

using namespace std;
using namespace v8;

void doMkArray(const FunctionCallbackInfo<Value> &args)
{
   v8::Isolate *I = v8::Isolate::GetCurrent();
   Local<Int32Array> testArray = Int32Array::New(ArrayBuffer::New(I, 4 * 36594368),0,36594368);
   int *dptr = (int*)testArray->GetIndexedPropertiesExternalArrayData();

   int i = 0;
   for (int xi = 0; xi < 332; xi++)
   {
      for (int yi = 0; yi < 332; yi++)
      {
         for (int zi = 0; zi < 332; zi++)
         {
            if ((xi + yi + zi) % 62 == 0) dptr[i] = 2;
            else if (yi < 16) dptr[i] = 2;
            else if (yi == 16) dptr[i] = 1;
            else dptr[i] = 0;

            i++;
         }
      }
   }

   args.GetReturnValue().Set(testArray);
}

void init(Handle<Object> exports)
{
   NODE_SET_METHOD(exports,"mkArray",doMkArray);
}

NODE_MODULE(array_test,init)
