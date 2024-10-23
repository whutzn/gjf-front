import{i as g,_ as y}from"./index-Dmd1i0Y0.js";import{S as b}from"./SwitchRoles-RlFaWP_G.js";import{m as P,a as C,ai as m,aq as x,p as a,q as _,U as s,t as p,P as u,M as o,O as t,S as e,u as f,R as v}from"./vue-BnjzXdHT.js";import"./element-DxMseATj.js";import"./vxe-B_SfDWnZ.js";const k=r=>{if(Array.isArray(r)&&r.length>0){const{roles:n}=g();return n.some(c=>r.includes(c))}else return console.error("need roles! Like checkPermission(['admin','editor'])"),!1},w={class:"app-container"},z={class:"margin-top-15"},B=P({__name:"directive",setup(r){const n=C(1),c=()=>{n.value++};return(N,S)=>{const i=m("el-tag"),l=m("el-tab-pane"),h=m("el-tabs"),d=x("permission");return a(),_("div",w,[s(b,{onChange:c}),(a(),_("div",{key:n.value,class:"margin-top-30"},[p("div",null,[u((a(),o(i,{type:"success",size:"large",effect:"plain"},{default:t(()=>[e(` 这里采用了 v-permission="['admin']" 所以只有 admin 可以看见这句话 `)]),_:1})),[[d,["admin"]]])]),p("div",null,[u((a(),o(i,{type:"success",size:"large",effect:"plain"},{default:t(()=>[e(` 这里采用了 v-permission="['editor']" 所以只有 editor 可以看见这句话 `)]),_:1})),[[d,["editor"]]])]),p("div",z,[u((a(),o(i,{type:"success",size:"large",effect:"plain"},{default:t(()=>[e(` 这里采用了 v-permission="['admin', 'editor']" 所以 admin 和 editor 都可以看见这句话 `)]),_:1})),[[d,["admin","editor"]]])])])),(a(),_("div",{key:`checkPermission${n.value}`,class:"margin-top-30"},[s(i,{type:"warning",size:"large"},{default:t(()=>[e(" 例如 Element Plus 的 el-tab-pane 或 el-table-column 以及其它动态渲染 Dom 的场景不适合使用 v-permission，这种情况下你可以通过 v-if 和 checkPermission 来实现： ")]),_:1}),s(h,{type:"border-card",class:"margin-top-15"},{default:t(()=>[f(k)(["admin"])?(a(),o(l,{key:0,label:"admin"},{default:t(()=>[e(" 这里采用了 "),s(i,null,{default:t(()=>[e(`v-if="checkPermission(['admin'])"`)]),_:1}),e(" 所以只有 admin 可以看见这句话 ")]),_:1})):v("",!0),f(k)(["editor"])?(a(),o(l,{key:1,label:"editor"},{default:t(()=>[e(" 这里采用了 "),s(i,null,{default:t(()=>[e(`v-if="checkPermission(['editor'])"`)]),_:1}),e(" 所以只有 editor 可以看见这句话 ")]),_:1})):v("",!0),f(k)(["admin","editor"])?(a(),o(l,{key:2,label:"admin 和 editor"},{default:t(()=>[e(" 这里采用了 "),s(i,null,{default:t(()=>[e(`v-if="checkPermission(['admin', 'editor'])"`)]),_:1}),e(" 所以 admin 和 editor 都可以看见这句话 ")]),_:1})):v("",!0)]),_:1})]))])}}}),U=y(B,[["__scopeId","data-v-6d704b73"]]);export{U as default};