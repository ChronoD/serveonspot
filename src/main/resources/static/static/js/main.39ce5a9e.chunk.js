(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{184:function(t,e,n){},185:function(t,e,n){},338:function(t,e,n){"use strict";n.r(e);var r=n(0),i=n.n(r),a=n(24),s=n.n(a),o=(n(184),n(185),n(96)),c=n(346),p=n(45),u=n(176),d=n(73),l=n(42),g=n(39),j=Object(g.c)({name:"mainPanel",initialState:{customerMode:!0},reducers:{toggleCustomerMode:function(t){t.customerMode=!t.customerMode}}}),f=j.actions.toggleCustomerMode,m=j.reducer,b=l.c,h=n(51),O=n.n(h),E=n(71),v={gettingSpecialists:!1,gettingSpecialistsError:void 0,specialists:void 0,registeringAppointment:!1,registeringSpecialistId:void 0,registeringError:void 0,appointmentInfo:void 0,unregisteringAppointment:!1,unregisteringError:void 0},x=Object(g.b)("customer/register",function(){var t=Object(E.a)(O.a.mark((function t(e,n){var r,i;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.dispatch(k(e)),t.next=3,fetch("http://localhost:8080/api/appointments",{method:"POST",headers:{"Access-Control-Allow-Origin":"*","Content-Type":"application/json"},body:JSON.stringify({specialistId:e})});case 3:return r=t.sent,t.next=6,r.json();case 6:return i=t.sent,t.abrupt("return",i);case 8:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),I=Object(g.b)("customer/unregisterAppointment",function(){var t=Object(E.a)(O.a.mark((function t(e){var n,r;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8080/api/appointments/".concat(e),{method:"PATCH",headers:{"Access-Control-Allow-Origin":"*","Content-Type":"application/json"},body:JSON.stringify({status:"UNREGISTERED"})});case 2:return n=t.sent,t.next=5,n.json();case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),A=Object(g.c)({name:"customer",initialState:v,reducers:{gettingSpecialists:function(t){t.gettingSpecialists=!0},specialistsSuccess:function(t,e){t.gettingSpecialists=!1,t.specialists=e.payload},specialistsError:function(t,e){t.gettingSpecialists=!1,t.registeringError=e.payload},setRegisteringSpecialistId:function(t,e){t.registeringSpecialistId=e.payload},resetRegisteringError:function(t){t.registeringError=void 0},gettingAppointmentSuccess:function(t,e){t.appointmentInfo=e.payload},gettingAppointmentError:function(t,e){t.registeringError=e.payload},resetUnregisteringError:function(t){t.unregisteringError=void 0},resetCustomerState:function(t){return v}},extraReducers:function(t){t.addCase(x.pending,(function(t){t.registeringAppointment=!0})),t.addCase(x.fulfilled,(function(t,e){t.registeringAppointment=!1,t.registeringSpecialistId=void 0,t.appointmentInfo=e.payload,t.registeringError=void 0})),t.addCase(x.rejected,(function(t,e){t.registeringAppointment=!1,t.registeringSpecialistId=void 0,t.registeringError=e.error?new Error(e.error.message):void 0})),t.addCase(I.pending,(function(t){t.unregisteringAppointment=!0})),t.addCase(I.fulfilled,(function(t,e){t.appointmentInfo=e.payload,t.unregisteringAppointment=!1,t.unregisteringError=void 0})),t.addCase(I.rejected,(function(t,e){t.unregisteringAppointment=!1,t.unregisteringError=e.error?new Error(e.error.message):void 0}))}}),S=A.actions,y=(S.gettingSpecialists,S.specialistsSuccess),C=S.specialistsError,k=S.setRegisteringSpecialistId,T=S.resetRegisteringError,w=S.gettingAppointmentSuccess,N=(S.gettingAppointmentError,S.resetUnregisteringError),R=S.resetCustomerState,D=A.reducer,F=n(167);function L(t,e){var n=new EventSource("http://127.0.0.1:8080/api/specialists");return n.onerror=function(){e(new Error("Nepavyko gauti specialist\u0173 duomen\u0173")),2===n.readyState&&setTimeout(L,300)},n.onmessage=function(e){var n=JSON.parse(e.data);t(n)},n}function U(t,e){var n=new EventSource("http://127.0.0.1:8080/api/appointments/".concat(t));return n.onerror=function(){2===n.readyState&&setTimeout(U,300)},n.onmessage=function(t){var n=JSON.parse(t.data);e(n)},n}function P(t,e,n){var r=new F.EventSourcePolyfill("http://127.0.0.1:8080/api/appointments",{headers:{"Access-Control-Allow-Origin":"*",authorization:t}});return r.onerror=function(){if(2===r.readyState)return setTimeout(P,300),n(new Error("Nepavyko gauti vizit\u0173 duomen\u0173"))},r.onmessage=function(t){var n=JSON.parse(t.data);e(n)},r}var M=n(343),H=n(48),z=n.n(H),G=n(49),J=n(6);function V(t){var e=t.appointmentInfo,n=t.unregisterAppointment,r=t.unregistering,i=t.unregisteringError,a=t.closeUnregisteringError,s=t.returnToMenu,o=e.positionOnTheList,c=e.specialist,p=e.status,d=e.approximateTimeLeft,l=Object(G.a)(p);return Object(J.jsxs)(J.Fragment,{children:[Object(J.jsx)(z.a,{visible:!!i,onCancel:a,footer:null,children:Object(J.jsx)("p",{children:"\u012evyko klaida, pabandykite v\u0117liau"})}),Object(J.jsxs)(M.a,{title:"".concat(c.specialistType," specialistas"),style:{width:300,border:"5px solid ".concat(l)},children:[Object(J.jsxs)(J.Fragment,{children:[Object(J.jsx)("p",{children:"J\u016bs\u0173 numeriukas: ".concat(e.appointmentId)}),Object(J.jsx)("p",{children:"Vieta eil\u0117je: ".concat(o)}),Object(J.jsx)("p",{children:d})]}),"REGISTERED"===p&&Object(J.jsx)(u.a,{type:"primary",onClick:n,loading:r,children:"At\u0161aukti"}),("UNREGISTERED"===p||"FINISHED"===p||"CANCELLED"===p)&&Object(J.jsx)(u.a,{type:"primary",onClick:s,children:"Atgal"})]})]})}var B=n(342);function _(t){var e=t.registerAppointment,n=t.registering,r=t.registeringSpecialistId,i=t.registeringError,a=t.closeRegisteringError,s=t.specialists;return Object(J.jsxs)("div",{children:[Object(J.jsx)(z.a,{visible:!!i,onCancel:a,footer:null,children:Object(J.jsx)("p",{children:"\u012evyko klaida, pabandykite v\u0117liau"})}),Object(J.jsx)(J.Fragment,{children:s.length&&Object(J.jsxs)(J.Fragment,{children:[Object(J.jsx)("div",{children:"Specialistai:"}),Object(J.jsx)(B.b,{itemLayout:"vertical",size:"large",dataSource:s,renderItem:function(t){return Object(J.jsx)(B.b.Item,{children:Object(J.jsx)(M.a,{title:t.specialistType,children:Object(J.jsx)(u.a,{type:"primary",onClick:function(){return e(t.specialistId)},loading:n&&r===t.specialistId,children:"Registruotis"})})})}})]})}),0===s.length&&"\u0160iuo metu n\u0117ra dirban\u010di\u0173 specialist\u0173"]})}function q(){var t=b((function(t){return t.customer})),e=t.gettingSpecialists,n=t.gettingSpecialistsError,i=t.specialists,a=t.registeringAppointment,s=t.registeringSpecialistId,o=t.registeringError,c=t.appointmentInfo,u=t.unregisteringAppointment,g=t.unregisteringError,j=Object(l.b)();function f(t){j(y(t))}function m(t){j(C(t))}function h(t){j(w(t))}var O=null;Object(r.useEffect)((function(){return c?O&&O.close():O=L(f,m),function(){O&&O.close()}}),[c]);var E=null;return Object(r.useEffect)((function(){if(c)return E=U(c.appointmentId,h),function(){E&&E.close()}}),[c]),Object(J.jsxs)("div",{children:[!i&&Object(J.jsx)(d.a,{children:Object(J.jsx)(p.a,{span:12,offset:6,children:"Laukiama specialist\u0173 duomen\u0173"})}),i&&!c&&Object(J.jsx)(_,{registerAppointment:function(t){j(x(t))},registering:a,registeringSpecialistId:s,registeringError:o,closeRegisteringError:function(){j(T())},loadingSpecialists:e,loadingSpecialistsError:n,specialists:i}),c&&Object(J.jsx)(V,{appointmentInfo:c,unregisterAppointment:function(){return t=c.appointmentId,void j(I(t));var t},unregistering:u,unregisteringError:g,closeUnregisteringError:function(){j(N())},returnToMenu:function(){j(R())}})]})}function W(t){var e=t.appointment,n=t.startAppointment,r=t.endAppointment,i=t.cancelAppointment,a=t.updating,s=t.actionsDisabled,o=t.isAdmin,c=Object(G.a)(e.status),p=Object(G.c)(e.specialist.specialistType),d="UNREGISTERED"===e.status||"FINISHED"===e.status||"CANCELLED"===e.status||s,l="REGISTERED"!==e.status||s,g="STARTED"!==e.status||s;return Object(J.jsx)(M.a,{bodyStyle:{display:o?"none":void 0},style:{width:300,border:"5px solid ".concat(c)},title:"Nr. ".concat(e.appointmentId,": ").concat("REGISTERED"===e.status?"laukia":"vyksta"),extra:Object(J.jsxs)(J.Fragment,{children:[!o&&Object(J.jsx)("p",{children:Object(J.jsx)(u.a,{disabled:d,onClick:function(){return i(e.appointmentId)},loading:a,size:"small",children:"at\u0161aukti"})}),o&&Object(J.jsx)(J.Fragment,{children:" ".concat(p)})]}),children:!o&&Object(J.jsxs)(J.Fragment,{children:[Object(J.jsx)(u.a,{disabled:l,onClick:function(){return n(e.appointmentId)},loading:a,children:"prad\u0117ti"}),Object(J.jsx)(u.a,{disabled:g,onClick:function(){return r(e.appointmentId)},loading:a,children:"baigti"})]})})}function K(t){var e=t.userInfo,n=t.appointments,r=t.appointmentsError,i=t.startAppointment,a=t.endAppointment,s=t.cancelAppointment,o=t.updating,c=t.updatingAppointmentId,u=t.updatingError,l=t.closeUpdatingError,g="ADMIN"===e.authority;return Object(J.jsxs)(J.Fragment,{children:[Object(J.jsx)(z.a,{visible:!!u,onCancel:l,footer:null,children:Object(J.jsx)("p",{children:"\u012evyko klaida, bandykite v\u0117liau"})}),Object(J.jsxs)(d.a,{children:[r&&Object(J.jsx)(p.a,{span:12,offset:6,children:"Klaida gaunant vizit\u0173 duomenis, palaukite"}),!r&&Object(J.jsx)(p.a,{span:12,offset:6,children:e&&!n?"Laukiama vizit\u0173 duomen\u0173":"Vizitai"})]}),void 0!==n&&Object(J.jsx)(d.a,{justify:"center",children:Object(J.jsx)(B.b,{itemLayout:"horizontal",dataSource:n,locale:{emptyText:"\u0160iuo metu prisiregistravusi\u0173 n\u0117ra."},renderItem:function(t,e){return Object(J.jsx)(B.b.Item,{children:Object(J.jsx)(W,{appointment:t,startAppointment:i,endAppointment:a,cancelAppointment:s,updating:o&&c===t.appointmentId,actionsDisabled:0!==e||g,isAdmin:g})})}})})]})}var Q=n(84),X=n(344),Y=n(345),Z={labelCol:{span:8},wrapperCol:{span:16}},$={wrapperCol:{offset:8,span:16}};function tt(t){var e=t.onSubmit,n=t.loginError,r=t.closeLoginError;return Object(J.jsxs)(d.a,{children:[Object(J.jsx)(z.a,{visible:!!n,onCancel:r,footer:null,children:Object(J.jsx)("p",{children:"Prisijungti nepavyko"})}),Object(J.jsxs)(X.a,Object(Q.a)(Object(Q.a)({},Z),{},{name:"basic",initialValues:{remember:!0},onFinish:e,children:[Object(J.jsx)(X.a.Item,{label:"Vartotojas",name:"username",rules:[{required:!0,message:"Vartotojo vardas b\u016btinas!"}],children:Object(J.jsx)(Y.a,{})}),Object(J.jsx)(X.a.Item,{label:"Slapta\u017eodis",name:"password",rules:[{required:!0,message:"Slapta\u017eodis b\u016btinas!"}],children:Object(J.jsx)(Y.a.Password,{})}),Object(J.jsx)(X.a.Item,Object(Q.a)(Object(Q.a)({},$),{},{children:Object(J.jsx)(u.a,{type:"primary",htmlType:"submit",children:"Prisijungti"})}))]}))]})}function et(t){var e=t.userInfo,n=t.logout;return Object(J.jsx)(J.Fragment,{children:Object(J.jsx)(d.a,{children:Object(J.jsxs)(p.a,{span:6,offset:16,children:[Object(J.jsx)(d.a,{justify:"end",children:Object(J.jsx)(u.a,{onClick:n,children:"Atsijungti"})}),Object(J.jsx)(d.a,{justify:"end",children:Object(J.jsx)("div",{children:"Prisijunges kaip:"})}),Object(J.jsx)(d.a,{justify:"end",align:"middle",children:Object(J.jsx)("div",{children:null!==e.specialist?Object(G.c)(e.specialist.specialistType):e.authority.toLowerCase()})})]})})})}var nt={gettingUserInfo:!1,userInfo:void 0,authHeader:void 0,userInfoError:void 0,updatingAppointment:!1,updatingAppointmentId:void 0,updatingAppointmentError:void 0,updatedAppointment:void 0,appointments:void 0,appointmentsError:void 0},rt=Object(g.b)("staff/login",function(){var t=Object(E.a)(O.a.mark((function t(e,n){var r,i,a;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(G.b)(e),t.next=3,fetch("http://localhost:8080/api/user",{method:"GET",headers:{authorization:r,"Access-Control-Allow-Origin":"*"}});case 3:return i=t.sent,t.next=6,i.json();case 6:if(a=t.sent,400!==i.status&&401!==i.status&&500!==i.status){t.next=13;break}return t.t0=n,t.next=11,i.json();case 11:return t.t1=t.sent,t.abrupt("return",t.t0.rejectWithValue.call(t.t0,t.t1));case 13:return t.abrupt("return",a);case 14:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),it=Object(g.b)("staff/updateAppointment",function(){var t=Object(E.a)(O.a.mark((function t(e,n){var r,i;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.dispatch(ut(e.appointmentId)),t.next=3,fetch("http://localhost:8080/api/appointments/".concat(e.appointmentId),{method:"PATCH",headers:{authorization:"".concat(n.getState().staff.authHeader),"Access-Control-Allow-Origin":"*","Content-Type":"application/json"},body:JSON.stringify({status:e.status})});case 3:if(400!==(r=t.sent).status&&401!==r.status&&500!==r.status){t.next=10;break}return t.t0=n,t.next=8,r.json();case 8:return t.t1=t.sent,t.abrupt("return",t.t0.rejectWithValue.call(t.t0,t.t1));case 10:return t.next=12,r.json();case 12:return i=t.sent,t.abrupt("return",i);case 14:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),at=Object(g.c)({name:"staff",initialState:nt,reducers:{setStaffAppointments:function(t,e){t.appointments=e.payload,t.appointmentsError=void 0},setStaffAppointmentsError:function(t,e){t.appointments=void 0,t.appointmentsError=e.payload},setUpdatingAppointmentId:function(t,e){t.updatingAppointmentId=e.payload},resetLoginError:function(t){t.userInfoError=void 0},resetUpdatingError:function(t){t.updatingAppointmentError=void 0},logout:function(t){return nt}},extraReducers:function(t){t.addCase(rt.pending,(function(t){t.gettingUserInfo=!0})),t.addCase(rt.fulfilled,(function(t,e){t.gettingUserInfo=!1,t.userInfo=e.payload,t.userInfoError=void 0,t.authHeader=Object(G.b)({username:e.meta.arg.username,password:e.meta.arg.password})})),t.addCase(rt.rejected,(function(t,e){t.gettingUserInfo=!1,t.userInfo=void 0,t.userInfoError=e.error?new Error(e.error.message):void 0})),t.addCase(it.pending,(function(t){t.updatingAppointment=!0})),t.addCase(it.fulfilled,(function(t,e){var n;t.updatingAppointment=!1,t.updatingAppointmentId=void 0,t.appointments=null===(n=t.appointments)||void 0===n?void 0:n.map((function(t){return t.appointmentId===e.payload.appointmentId?e.payload:t})),t.updatingAppointmentError=void 0})),t.addCase(it.rejected,(function(t,e){t.updatingAppointmentId=void 0,t.updatingAppointment=!1,t.updatingAppointmentError=e.error?new Error(e.error.message):void 0}))}}),st=at.actions,ot=st.resetLoginError,ct=st.setStaffAppointments,pt=st.setStaffAppointmentsError,ut=st.setUpdatingAppointmentId,dt=st.resetUpdatingError,lt=st.logout,gt=at.reducer;function jt(t){Object(o.a)(t);var e=b((function(t){return t.staff})),n=e.authHeader,i=e.userInfo,a=e.userInfoError,s=e.updatingAppointment,c=e.updatingAppointmentId,u=e.updatingAppointmentError,d=e.appointments,g=e.appointmentsError,j=Object(l.b)();var f=function(t){return function(e){j(it({appointmentId:e,status:t}))}};function m(t){j(ct(t))}function h(t){j(pt(t))}var O=null;return Object(r.useEffect)((function(){return i&&n&&(O=P(n,m,h)),function(){O&&O.close()}}),[i]),Object(J.jsxs)(J.Fragment,{children:[!n&&Object(J.jsx)(tt,{onSubmit:function(t){j(rt(t))},loginError:a,closeLoginError:function(){j(ot())}}),!!n&&Object(J.jsxs)(p.a,{span:24,children:[Object(J.jsx)(p.a,{span:24,children:i&&Object(J.jsx)(et,{userInfo:i,logout:function(){j(lt())}})}),i&&Object(J.jsx)(K,{userInfo:i,appointments:d,appointmentsError:g,startAppointment:f("STARTED"),endAppointment:f("FINISHED"),cancelAppointment:f("CANCELLED"),updating:s,updatingAppointmentId:c,updatingError:u,closeUpdatingError:function(){j(dt())}})]})]})}var ft=n(113);function mt(t){Object(o.a)(t);var e=b((function(t){return t})),n=e.mainPanel.customerMode,r=e.customer.appointmentInfo,i=e.staff.userInfo,a=Object(l.b)();return Object(J.jsxs)(c.a,{children:[Object(J.jsx)(ft.Header,{}),Object(J.jsxs)(ft.Content,{style:{minHeight:"30rem",paddingTop:"1rem"},children:[Object(J.jsx)(p.a,{span:24,offset:18,children:!r&&!i&&Object(J.jsx)(u.a,{onClick:function(){a(f())},children:n?"Darbuotojams":"Gr\u012f\u017eti"})}),Object(J.jsxs)(d.a,{justify:"center",align:"middle",children:[!n&&Object(J.jsx)(jt,{}),n&&Object(J.jsx)(q,{})]})]}),Object(J.jsx)(ft.Footer,{children:"Serve-On-Spot App, 2021"})]})}var bt=n(173),ht=Object(g.a)({reducer:{mainPanel:m,customer:D,staff:gt},middleware:function(t){return t({serializableCheck:!1})}});var Ot=function(){return Object(J.jsx)("div",{className:"App",children:Object(J.jsx)(bt.ErrorBoundary,{FallbackComponent:function(){return Object(J.jsx)("p",{children:"\u012evyko netik\u0117ta klaida. Perkraukite puslap\u012f"})},children:Object(J.jsx)(l.a,{store:ht,children:Object(J.jsx)(mt,{})})})})},Et=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,347)).then((function(e){var n=e.getCLS,r=e.getFID,i=e.getFCP,a=e.getLCP,s=e.getTTFB;n(t),r(t),i(t),a(t),s(t)}))};s.a.render(Object(J.jsx)(i.a.StrictMode,{children:Object(J.jsx)(Ot,{})}),document.getElementById("root")),Et()},49:function(t,e,n){"use strict";(function(t){function r(e){var n=e.username+":"+e.password;return"Basic "+t.from(n).toString("base64")}function i(t){switch(t){case"REGISTERED":return"black";case"UNREGISTERED":return"grey";case"CANCELLED":return"red";case"FINISHED":return"blue";case"STARTED":return"green"}}function a(t){switch(t){case"ONE_MINUTE":return"1 min. specialistas";case"FIVE_MINUTES":return"5 min. specialistas";case"NINE_MINUTES":return"9 min. specialistas";default:return""}}n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return i})),n.d(e,"c",(function(){return a}))}).call(this,n(193).Buffer)}},[[338,1,2]]]);
//# sourceMappingURL=main.39ce5a9e.chunk.js.map