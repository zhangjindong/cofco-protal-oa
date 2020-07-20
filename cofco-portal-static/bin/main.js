#!/usr/bin/env node

const program = require('commander');
const fs=require('fs');
const cwd=process.cwd();
program
  .command('g <moduleName>')
  .option('-m, --moduleName', 'angularModule的名字')
  .action(function (moduleName) {
     let out=`ng g module pages/${moduleName} --routing=true --routingScope=Child`;
     var exec = require('child_process').exec;
     exec(out,async function(err,stdout,stderr){
        if(err) {
            console.log('创建模块代码错误:'+stderr);
        } else {
            console.log(stdout);
            console.log('创建模块成功,准备创建模块对应的组件,列表、新增表单、新增页面.....');
            //step1
            async function initComponent(){
              try {
                     let a=await createComponent(exec,`${moduleName}-list`,`${moduleName}`);
                     await sleep(1500);
                     let b=await createComponent(exec,`${moduleName}-add-form`,`${moduleName}`);
                     await sleep(1500);
                     let c=await createComponent(exec,`${moduleName}-add-page`,`${moduleName}`);
                     await sleep(1500);
                     await Promise.resolve(true);
              } catch (error) {
                     await Promise.reject(error);
              }
            }
            //step2
            async function configRouting(){
                   let routingFilePath=`${cwd}/src/app/pages/${moduleName}/${moduleName}-routing.module.ts`;
                    fs.readFile(`${routingFilePath}`,async (err,data)=>{ 
                       try {
                           let listComponentName=getComponentName(moduleName,'list');
                           let listImport=getComponentImport(listComponentName,`./${moduleName}-list/${moduleName}-list.component`);
                           let addComponentName=getComponentName(moduleName,'addPage');
                           let addImport=getComponentImport(addComponentName,`./${moduleName}-add-page/${moduleName}-add-page.component`);
                           let Routes=`[
                           { path: '', 
                           redirectTo:"${moduleName}/list"
                           },
                           { path: "${moduleName}/list", 
                              component: ${listComponentName}
                           },
                           { path: "${moduleName}/add/:id", 
                              component: ${addComponentName}
                           },
                           ]`;
                           let code=data.toString('utf-8');
                           let a=code.split(';');
                           a[2]=`\n${listImport}
                                 \n${addImport} 
                                 \nconst routes : Routes = ${Routes}
                                `;
                           let c=a.join("");     
                           fs.writeFile(`${routingFilePath}`,c,async (err,data)=>{
                               if(err){
                                  console.log(err);
                                  await Promise.reject(err);
                               }
                               console.log('配置成功')
                               await Promise.resolve(true);
                           })
                          
                       } catch (error) {
                           await Promise.reject(error);
                       }
                    })
            }
             
            //step3
            var addModuleRoutingToRoot=async function(){
               let routingFilePath=`${cwd}/src/app/app-routing.module.ts`;
               fs.readFile(`${routingFilePath}`,async (err,data)=>{
                    try {
                         if(err){
                            await Promise.reject(err);
                         }
                         let code=data.toString('utf-8');
                         let a=code.split(';');
                         let b=a[2];
                         let match=b.match(/},\r\n/g);
                         console.log(match);
                    } catch (error) {
                          await Promise.reject(err);
                    }
               })
            }


            var main=async function(){
                    try {
                         let step1=await initComponent();
                         console.log('..........组件创建完毕,准备生成路由配置.....');
                         await sleep(1500);
                         let step2=await configRouting();
                         await sleep(1500);
                         console.log('..........模块路由配置完成，准备添加到根路由.....');
                         let step3=await addModuleRoutingToRoot();
                    } catch (error) {
                         console.log(error);
                    }
            }
            main();
        }
    });
  })

program.parse(process.argv);

async function createComponent(exec,componentName,moduleName){
   let cmd=`ng g component pages/${moduleName}/${componentName} --export=true --module=${moduleName}`;
   exec(cmd,async (err,stdout,stderr)=>{
        if(err){
           await Promise.reject(err);
        }else{
         //   console.log(stdout);
           await Promise.resolve(true);
        }
   })
}

async function sleep(time){
   return new Promise((resolve,reject)=>{
          setTimeout(()=>{
              resolve(true);
          },time)
   })
}


function getComponentName(moduleName,suffix){
   let name='';
   let arr=moduleName.split('-');
   function convert(item){
         return item.replace(/\b\w+\b/g, function(word){
                   return word.substring(0,1).toUpperCase()+word.substring(1);}
         );
   }
   arr.forEach((item)=>{
         item =convert(item);
         name+=item;
   });
   suffix=convert(suffix);
   return name+suffix+'Component';
}

function getComponentImport(componentName,path){
  return `import { ${componentName} } from '${path}';`
}

function getCharCodeAtFormBackStart(char,str){
     let at;
   　if(str.length>0){//判断传入的参数是否为空；
　　　　　　　　　　for(var i=str.length-1;i>=0;i--){
　　　　　　　　　　　　let a=str[i];
                      if(a == char){
                         at=i;
                         break;
                      }  
　　　　　　　　　　　}
　　　　　　　　}
     return at;
}