import{d as u,_ as m}from"./index-Dmd1i0Y0.js";import{m as h,a as S,b as f,ai as r,p as v,q as w,t,T as g,u as b,U as s,O as I,aH as V,aI as x}from"./vue-BnjzXdHT.js";const R=e=>(V("data-v-54e6a169"),e=e(),x(),e),B={class:"switch-roles"},C=R(()=>t("span",null,"切换权限：",-1)),U=h({__name:"SwitchRoles",emits:["change"],setup(e,{emit:i}){const d=i,o=u(),a=S(o.roles[0]);return f(a,async n=>{await o.changeRoles(n),d("change")}),(n,l)=>{const c=r("el-radio-button"),p=r("el-radio-group");return v(),w("div",null,[t("div",null,"你的权限："+g(b(o).roles),1),t("div",B,[C,s(p,{modelValue:a.value,"onUpdate:modelValue":l[0]||(l[0]=_=>a.value=_)},{default:I(()=>[s(c,{label:"editor"}),s(c,{label:"admin"})]),_:1},8,["modelValue"])])])}}}),N=m(U,[["__scopeId","data-v-54e6a169"]]);export{N as S};
