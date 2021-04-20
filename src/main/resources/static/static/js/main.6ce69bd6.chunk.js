(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{184:function(t,e,n){},185:function(t,e,n){},338:function(t,e,n){"use strict";n.r(e);var r=n(0),i=n.n(r),s=n(24),a=n.n(s),o=(n(184),n(185),n(96)),c=n(346),p=n(46),u=n(176),d=n(73),l=n(42),g=n(39),j=Object(g.c)({name:"mainPanel",initialState:{customerMode:!0},reducers:{toggleCustomerMode:function(t){t.customerMode=!t.customerMode}}}),f=j.actions.toggleCustomerMode,m=j.reducer,b=l.c,h=n(51),O=n.n(h),E=n(71),v={gettingSpecialists:!1,gettingSpecialistsError:void 0,specialists:void 0,registeringAppointment:!1,registeringSpecialistId:void 0,registeringError:void 0,appointmentInfo:void 0,unregisteringAppointment:!1,unregisteringError:void 0},x=Object(g.b)("customer/register",function(){var t=Object(E.a)(O.a.mark((function t(e,n){var r,i;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.dispatch(C(e)),t.next=3,fetch("http://localhost:8080/api/appointments",{method:"POST",headers:{"Access-Control-Allow-Origin":"*","Content-Type":"application/json"},body:JSON.stringify({specialistId:e})});case 3:return r=t.sent,t.next=6,r.json();case 6:return i=t.sent,t.abrupt("return",i);case 8:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),I=Object(g.b)("customer/unregisterAppointment",function(){var t=Object(E.a)(O.a.mark((function t(e){var n,r;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:8080/api/appointments/".concat(e),{method:"PATCH",headers:{"Access-Control-Allow-Origin":"*","Content-Type":"application/json"},body:JSON.stringify({status:"UNREGISTERED"})});case 2:return n=t.sent,t.next=5,n.json();case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),A=Object(g.c)({name:"customer",initialState:v,reducers:{gettingSpecialists:function(t){t.gettingSpecialists=!0},specialistsSuccess:function(t,e){t.gettingSpecialists=!1,t.specialists=e.payload},specialistsError:function(t,e){t.gettingSpecialists=!1,t.registeringError=e.payload},setRegisteringSpecialistId:function(t,e){t.registeringSpecialistId=e.payload},resetRegisteringError:function(t){t.registeringError=void 0},gettingAppointmentSuccess:function(t,e){t.appointmentInfo=e.payload},gettingAppointmentError:function(t,e){t.registeringError=e.payload},resetUnregisteringError:function(t){t.unregisteringError=void 0},resetCustomerState:function(t){return v}},extraReducers:function(t){t.addCase(x.pending,(function(t){t.registeringAppointment=!0})),t.addCase(x.fulfilled,(function(t,e){t.registeringAppointment=!1,t.registeringSpecialistId=void 0,t.appointmentInfo=e.payload,t.registeringError=void 0})),t.addCase(x.rejected,(function(t,e){t.registeringAppointment=!1,t.registeringSpecialistId=void 0,t.registeringError=e.error?new Error(e.error.message):void 0})),t.addCase(I.pending,(function(t){t.unregisteringAppointment=!0})),t.addCase(I.fulfilled,(function(t,e){t.appointmentInfo=e.payload,t.unregisteringAppointment=!1,t.unregisteringError=void 0})),t.addCase(I.rejected,(function(t,e){t.unregisteringAppointment=!1,t.unregisteringError=e.error?new Error(e.error.message):void 0}))}}),S=A.actions,y=(S.gettingSpecialists,S.specialistsSuccess),C=(S.specialistsError,S.setRegisteringSpecialistId),k=S.resetRegisteringError,T=S.gettingAppointmentSuccess,w=(S.gettingAppointmentError,S.resetUnregisteringError),N=S.resetCustomerState,R=A.reducer,D=n(167);function F(t){var e=new EventSource("https://serve-on-spot.herokuapp.com/api/specialists");return e.onerror=function(){2===e.readyState&&setTimeout(F,300)},e.onmessage=function(e){var n=JSON.parse(e.data);t(n)},e}function L(t,e){var n=new EventSource("https://serve-on-spot.herokuapp.com/api/appointments/".concat(t));return n.onerror=function(){2===n.readyState&&setTimeout(L,300)},n.onmessage=function(t){var n=JSON.parse(t.data);e(n)},n}function U(t,e,n){var r=new D.EventSourcePolyfill("https://serve-on-spot.herokuapp.com/api/appointments",{headers:{"Access-Control-Allow-Origin":"*",authorization:t}});return r.onerror=function(){if(2===r.readyState)return setTimeout(U,300),n(new Error("Nepavyko gauti vizit\u0173 duomen\u0173"))},r.onmessage=function(t){var n=JSON.parse(t.data);e(n)},r}var P=n(343),M=n(49),H=n.n(M),z=n(44),G=n(6);function J(t){var e=t.appointmentInfo,n=t.unregisterAppointment,r=t.unregistering,i=t.unregisteringError,s=t.closeUnregisteringError,a=t.returnToMenu,o=e.positionOnTheList,c=e.specialist,p=e.status,d=e.approximateTimeLeft,l=Object(z.a)(p);return Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(H.a,{visible:!!i,onCancel:s,footer:null,children:Object(G.jsx)("p",{children:"\u012evyko klaida, pabandykite v\u0117liau"})}),Object(G.jsxs)(P.a,{title:Object(z.c)(c.specialistType),style:{width:300,border:"5px solid ".concat(l)},children:[Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)("p",{children:"J\u016bs\u0173 numeriukas: ".concat(e.appointmentId)}),Object(G.jsx)("p",{children:"Vieta eil\u0117je: ".concat(o)}),Object(G.jsx)("p",{children:d})]}),"REGISTERED"===p&&Object(G.jsx)(u.a,{type:"primary",onClick:n,loading:r,children:"At\u0161aukti"}),("UNREGISTERED"===p||"FINISHED"===p||"CANCELLED"===p)&&Object(G.jsx)(u.a,{type:"primary",onClick:a,children:"Atgal"})]})]})}var V=n(342);function B(t){var e=t.registerAppointment,n=t.registering,r=t.registeringSpecialistId,i=t.registeringError,s=t.closeRegisteringError,a=t.specialists;return Object(G.jsxs)("div",{children:[Object(G.jsx)(H.a,{visible:!!i,onCancel:s,footer:null,children:Object(G.jsx)("p",{children:"\u012evyko klaida, pabandykite v\u0117liau"})}),Object(G.jsx)(G.Fragment,{children:a.length&&Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)("div",{children:"Specialistai:"}),Object(G.jsx)(V.b,{itemLayout:"vertical",size:"large",dataSource:a,renderItem:function(t){return Object(G.jsx)(V.b.Item,{children:Object(G.jsx)(P.a,{title:t.specialistType,children:Object(G.jsx)(u.a,{type:"primary",onClick:function(){return e(t.specialistId)},loading:n&&r===t.specialistId,children:"Registruotis"})})})}})]})}),0===a.length&&"\u0160iuo metu n\u0117ra dirban\u010di\u0173 specialist\u0173"]})}function _(){var t=b((function(t){return t.customer})),e=t.gettingSpecialists,n=t.gettingSpecialistsError,i=t.specialists,s=t.registeringAppointment,a=t.registeringSpecialistId,o=t.registeringError,c=t.appointmentInfo,u=t.unregisteringAppointment,g=t.unregisteringError,j=Object(l.b)();function f(t){j(y(t))}function m(t){j(T(t))}var h=null;Object(r.useEffect)((function(){return c?h&&h.close():h=F(f),function(){h&&h.close()}}),[c]);var O=null;return Object(r.useEffect)((function(){if(c)return O=L(c.appointmentId,m),function(){O&&O.close()}}),[c]),Object(G.jsxs)("div",{children:[!i&&Object(G.jsx)(d.a,{children:Object(G.jsx)(p.a,{span:12,offset:6,children:"Laukiama specialist\u0173 duomen\u0173"})}),i&&!c&&Object(G.jsx)(B,{registerAppointment:function(t){j(x(t))},registering:s,registeringSpecialistId:a,registeringError:o,closeRegisteringError:function(){j(k())},loadingSpecialists:e,loadingSpecialistsError:n,specialists:i}),c&&Object(G.jsx)(J,{appointmentInfo:c,unregisterAppointment:function(){return t=c.appointmentId,void j(I(t));var t},unregistering:u,unregisteringError:g,closeUnregisteringError:function(){j(w())},returnToMenu:function(){j(N())}})]})}function q(t){var e=t.appointment,n=t.startAppointment,r=t.endAppointment,i=t.cancelAppointment,s=t.updating,a=t.actionsDisabled,o=t.isAdmin,c=Object(z.a)(e.status),p=Object(z.c)(e.specialist.specialistType),d="UNREGISTERED"===e.status||"FINISHED"===e.status||"CANCELLED"===e.status||a,l="REGISTERED"!==e.status||a,g="STARTED"!==e.status||a;return Object(G.jsx)(P.a,{bodyStyle:{display:o?"none":void 0},style:{width:300,border:"5px solid ".concat(c)},title:"Nr. ".concat(e.appointmentId,": ").concat("REGISTERED"===e.status?"laukia":"vyksta"),extra:Object(G.jsxs)(G.Fragment,{children:[!o&&Object(G.jsx)("p",{children:Object(G.jsx)(u.a,{disabled:d,onClick:function(){return i(e.appointmentId)},loading:s,size:"small",children:"at\u0161aukti"})}),o&&Object(G.jsx)(G.Fragment,{children:" ".concat(p)})]}),children:!o&&Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(u.a,{disabled:l,onClick:function(){return n(e.appointmentId)},loading:s,children:"prad\u0117ti"}),Object(G.jsx)(u.a,{disabled:g,onClick:function(){return r(e.appointmentId)},loading:s,children:"baigti"})]})})}function W(t){var e=t.userInfo,n=t.appointments,r=t.appointmentsError,i=t.startAppointment,s=t.endAppointment,a=t.cancelAppointment,o=t.updating,c=t.updatingAppointmentId,u=t.updatingError,l=t.closeUpdatingError,g="ADMIN"===e.authority;return Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(H.a,{visible:!!u,onCancel:l,footer:null,children:Object(G.jsx)("p",{children:"\u012evyko klaida, bandykite v\u0117liau"})}),Object(G.jsxs)(d.a,{children:[r&&Object(G.jsx)(p.a,{span:12,offset:6,children:"Klaida gaunant vizit\u0173 duomenis, palaukite"}),!r&&Object(G.jsx)(p.a,{span:12,offset:6,children:e&&!n?"Laukiama vizit\u0173 duomen\u0173":"Vizitai"})]}),void 0!==n&&Object(G.jsx)(d.a,{justify:"center",children:Object(G.jsx)(V.b,{itemLayout:"horizontal",dataSource:n,locale:{emptyText:"\u0160iuo metu prisiregistravusi\u0173 n\u0117ra."},renderItem:function(t,e){return Object(G.jsx)(V.b.Item,{children:Object(G.jsx)(q,{appointment:t,startAppointment:i,endAppointment:s,cancelAppointment:a,updating:o&&c===t.appointmentId,actionsDisabled:0!==e||g,isAdmin:g})})}})})]})}var K=n(84),Q=n(344),X=n(345),Y={labelCol:{span:8},wrapperCol:{span:16}},Z={wrapperCol:{offset:8,span:16}};function $(t){var e=t.onSubmit,n=t.loginError,r=t.closeLoginError;return Object(G.jsxs)(d.a,{children:[Object(G.jsx)(H.a,{visible:!!n,onCancel:r,footer:null,children:Object(G.jsx)("p",{children:"Prisijungti nepavyko"})}),Object(G.jsxs)(Q.a,Object(K.a)(Object(K.a)({},Y),{},{name:"basic",initialValues:{remember:!0},onFinish:e,children:[Object(G.jsx)(Q.a.Item,{label:"Vartotojas",name:"username",rules:[{required:!0,message:"Vartotojo vardas b\u016btinas!"}],children:Object(G.jsx)(X.a,{})}),Object(G.jsx)(Q.a.Item,{label:"Slapta\u017eodis",name:"password",rules:[{required:!0,message:"Slapta\u017eodis b\u016btinas!"}],children:Object(G.jsx)(X.a.Password,{})}),Object(G.jsx)(Q.a.Item,Object(K.a)(Object(K.a)({},Z),{},{children:Object(G.jsx)(u.a,{type:"primary",htmlType:"submit",children:"Prisijungti"})}))]}))]})}function tt(t){var e=t.userInfo,n=t.logout;return Object(G.jsx)(G.Fragment,{children:Object(G.jsx)(d.a,{children:Object(G.jsxs)(p.a,{span:6,offset:16,children:[Object(G.jsx)(d.a,{justify:"end",children:Object(G.jsx)(u.a,{onClick:n,children:"Atsijungti"})}),Object(G.jsx)(d.a,{justify:"end",children:Object(G.jsx)("div",{children:"Prisijunges kaip:"})}),Object(G.jsx)(d.a,{justify:"end",align:"middle",children:Object(G.jsx)("div",{children:null!==e.specialist?Object(z.c)(e.specialist.specialistType):e.authority.toLowerCase()})})]})})})}var et={gettingUserInfo:!1,userInfo:void 0,authHeader:void 0,userInfoError:void 0,updatingAppointment:!1,updatingAppointmentId:void 0,updatingAppointmentError:void 0,updatedAppointment:void 0,appointments:void 0,appointmentsError:void 0},nt=Object(g.b)("staff/login",function(){var t=Object(E.a)(O.a.mark((function t(e,n){var r,i,s;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(z.b)(e),t.next=3,fetch("http://localhost:8080/api/user",{method:"GET",headers:{authorization:r,"Access-Control-Allow-Origin":"*"}});case 3:return i=t.sent,t.next=6,i.json();case 6:if(s=t.sent,400!==i.status&&401!==i.status&&500!==i.status){t.next=13;break}return t.t0=n,t.next=11,i.json();case 11:return t.t1=t.sent,t.abrupt("return",t.t0.rejectWithValue.call(t.t0,t.t1));case 13:return t.abrupt("return",s);case 14:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),rt=Object(g.b)("staff/updateAppointment",function(){var t=Object(E.a)(O.a.mark((function t(e,n){var r,i;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.dispatch(pt(e.appointmentId)),t.next=3,fetch("http://localhost:8080/api/appointments/".concat(e.appointmentId),{method:"PATCH",headers:{authorization:"".concat(n.getState().staff.authHeader),"Access-Control-Allow-Origin":"*","Content-Type":"application/json"},body:JSON.stringify({status:e.status})});case 3:if(400!==(r=t.sent).status&&401!==r.status&&500!==r.status){t.next=10;break}return t.t0=n,t.next=8,r.json();case 8:return t.t1=t.sent,t.abrupt("return",t.t0.rejectWithValue.call(t.t0,t.t1));case 10:return t.next=12,r.json();case 12:return i=t.sent,t.abrupt("return",i);case 14:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),it=Object(g.c)({name:"staff",initialState:et,reducers:{setStaffAppointments:function(t,e){t.appointments=e.payload,t.appointmentsError=void 0},setStaffAppointmentsError:function(t,e){t.appointments=void 0,t.appointmentsError=e.payload},setUpdatingAppointmentId:function(t,e){t.updatingAppointmentId=e.payload},resetLoginError:function(t){t.userInfoError=void 0},resetUpdatingError:function(t){t.updatingAppointmentError=void 0},logout:function(t){return et}},extraReducers:function(t){t.addCase(nt.pending,(function(t){t.gettingUserInfo=!0})),t.addCase(nt.fulfilled,(function(t,e){t.gettingUserInfo=!1,t.userInfo=e.payload,t.userInfoError=void 0,t.authHeader=Object(z.b)({username:e.meta.arg.username,password:e.meta.arg.password})})),t.addCase(nt.rejected,(function(t,e){t.gettingUserInfo=!1,t.userInfo=void 0,t.userInfoError=e.error?new Error(e.error.message):void 0})),t.addCase(rt.pending,(function(t){t.updatingAppointment=!0})),t.addCase(rt.fulfilled,(function(t,e){var n;t.updatingAppointment=!1,t.updatingAppointmentId=void 0,t.appointments=null===(n=t.appointments)||void 0===n?void 0:n.map((function(t){return t.appointmentId===e.payload.appointmentId?e.payload:t})),t.updatingAppointmentError=void 0})),t.addCase(rt.rejected,(function(t,e){t.updatingAppointmentId=void 0,t.updatingAppointment=!1,t.updatingAppointmentError=e.error?new Error(e.error.message):void 0}))}}),st=it.actions,at=st.resetLoginError,ot=st.setStaffAppointments,ct=st.setStaffAppointmentsError,pt=st.setUpdatingAppointmentId,ut=st.resetUpdatingError,dt=st.logout,lt=it.reducer;function gt(t){Object(o.a)(t);var e=b((function(t){return t.staff})),n=e.authHeader,i=e.userInfo,s=e.userInfoError,a=e.updatingAppointment,c=e.updatingAppointmentId,u=e.updatingAppointmentError,d=e.appointments,g=e.appointmentsError,j=Object(l.b)();var f=function(t){return function(e){j(rt({appointmentId:e,status:t}))}};function m(t){j(ot(t))}function h(t){j(ct(t))}var O=null;return Object(r.useEffect)((function(){return i&&n&&(O=U(n,m,h)),function(){O&&O.close()}}),[i]),Object(G.jsxs)(G.Fragment,{children:[!n&&Object(G.jsx)($,{onSubmit:function(t){j(nt(t))},loginError:s,closeLoginError:function(){j(at())}}),!!n&&Object(G.jsxs)(p.a,{span:24,children:[Object(G.jsx)(p.a,{span:24,children:i&&Object(G.jsx)(tt,{userInfo:i,logout:function(){j(dt())}})}),i&&Object(G.jsx)(W,{userInfo:i,appointments:d,appointmentsError:g,startAppointment:f("STARTED"),endAppointment:f("FINISHED"),cancelAppointment:f("CANCELLED"),updating:a,updatingAppointmentId:c,updatingError:u,closeUpdatingError:function(){j(ut())}})]})]})}var jt=n(113);function ft(t){Object(o.a)(t);var e=b((function(t){return t})),n=e.mainPanel.customerMode,r=e.customer.appointmentInfo,i=e.staff.userInfo,s=Object(l.b)();return Object(G.jsxs)(c.a,{children:[Object(G.jsx)(jt.Header,{}),Object(G.jsxs)(jt.Content,{style:{minHeight:"30rem",paddingTop:"1rem"},children:[Object(G.jsx)(p.a,{span:24,offset:18,children:!r&&!i&&Object(G.jsx)(u.a,{onClick:function(){s(f())},children:n?"Darbuotojams":"Gr\u012f\u017eti"})}),Object(G.jsxs)(d.a,{justify:"center",align:"middle",children:[!n&&Object(G.jsx)(gt,{}),n&&Object(G.jsx)(_,{})]})]}),Object(G.jsx)(jt.Footer,{children:"Serve-On-Spot App, 2021"})]})}var mt=n(173),bt=Object(g.a)({reducer:{mainPanel:m,customer:R,staff:lt},middleware:function(t){return t({serializableCheck:!1})}});var ht=function(){return Object(G.jsx)("div",{className:"App",children:Object(G.jsx)(mt.ErrorBoundary,{FallbackComponent:function(){return Object(G.jsx)("p",{children:"\u012evyko netik\u0117ta klaida. Perkraukite puslap\u012f"})},children:Object(G.jsx)(l.a,{store:bt,children:Object(G.jsx)(ft,{})})})})},Ot=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,347)).then((function(e){var n=e.getCLS,r=e.getFID,i=e.getFCP,s=e.getLCP,a=e.getTTFB;n(t),r(t),i(t),s(t),a(t)}))};a.a.render(Object(G.jsx)(i.a.StrictMode,{children:Object(G.jsx)(ht,{})}),document.getElementById("root")),Ot()},44:function(t,e,n){"use strict";(function(t){function r(e){var n=e.username+":"+e.password;return"Basic "+t.from(n).toString("base64")}function i(t){switch(t){case"REGISTERED":return"black";case"UNREGISTERED":return"grey";case"CANCELLED":return"red";case"FINISHED":return"blue";case"STARTED":return"green"}}function s(t){switch(t){case"ONE_MINUTE":return"1 min. specialistas";case"FIVE_MINUTES":return"5 min. specialistas";case"NINE_MINUTES":return"9 min. specialistas";default:return""}}n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return i})),n.d(e,"c",(function(){return s}))}).call(this,n(193).Buffer)}},[[338,1,2]]]);
//# sourceMappingURL=main.6ce69bd6.chunk.js.map