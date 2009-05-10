YUI.add("attribute",function(B){B.State=function(){this.data={};};B.State.prototype={add:function(O,S,U){var T=this.data;T[S]=T[S]||{};T[S][O]=U;},addAll:function(O,T){var S;for(S in T){if(T.hasOwnProperty(S)){this.add(O,S,T[S]);}}},remove:function(O,S){var T=this.data;if(T[S]&&(O in T[S])){delete T[S][O];}},removeAll:function(O,T){var S=this.data;B.each(T||S,function(V,U){if(B.Lang.isString(U)){this.remove(O,U);}else{this.remove(O,V);}},this);},get:function(O,S){var T=this.data;return(T[S]&&O in T[S])?T[S][O]:undefined;},getAll:function(O){var T=this.data,S;B.each(T,function(V,U){if(O in T[U]){S=S||{};S[U]=V[O];}},this);return S;}};var J=B.Object,K=".",F="Change",E="getter",C="setter",I="value",G="added",L="initializing",M="initValue",P="readOnly",H="writeOnce",D="validator",R="published",N,Q=B.EventTarget;function A(){this._ATTR_E_CFG={queuable:false,defaultFn:this._defAttrChangeFn,silent:true};this._ATTR_E_FACADE={};Q.call(this,{emitFacade:true});this._conf=new B.State();}A.INVALID_VALUE={};N=A.INVALID_VALUE;A.prototype={addAttr:function(T,S){if(!this.attrAdded(T)){S=S||{};var V,U=(I in S),O=this._conf;if(U){V=S.value;delete S.value;}S[G]=true;S[L]=true;O.addAll(T,S);if(U){this.set(T,V);}O.remove(T,L);}else{}return this;},attrAdded:function(O){return !!(this._conf.get(O,G));},removeAttr:function(O){this._conf.removeAll(O);},get:function(T){var W=T,S=this._conf,U,O,V;if(T.indexOf(K)!==-1){U=T.split(K);T=U.shift();}V=S.get(T,I);O=S.get(T,E);V=(O)?O.call(this,V,W):V;V=(U)?J.getValue(V,U):V;return V;},set:function(O,T,S){return this._setAttr(O,T,S);},reset:function(S){if(S){this.set(S,this._conf.get(S,M));}else{var O=this._conf.data.initValue;B.each(O,function(T,U){this.set(U,T);},this);}return this;},_set:function(O,T,S){return this._setAttr(O,T,S,true);},_setAttr:function(S,V,O,T){var X=true,a=this._conf,Y=a.data,W,Z,b,U;if(S.indexOf(K)!==-1){Z=S;b=S.split(K);S=b.shift();}W=(!Y.value||!(S in Y.value));if(!this.attrAdded(S)){}else{if(!W&&!T){if(a.get(S,H)){X=false;}if(a.get(S,P)){X=false;}}if(X){U=this.get(S);if(b){V=J.setValue(B.clone(U),b,V);if(V===undefined){X=false;}}if(X){if(a.get(S,L)){this._setAttrVal(S,Z,U,V);}else{this._fireAttrChange(S,Z,U,V,O);}}}}return this;},_fireAttrChange:function(U,Y,X,T,W){var O=U+F,S=this._conf,V;if(!S.get(U,R)){this.publish(O,this._ATTR_E_CFG);S.add(U,R,true);}V=(W)?B.merge(W):this._ATTR_E_FACADE;V.type=O;V.attrName=U;V.subAttrName=Y;V.prevVal=X;V.newVal=T;this.fire(V);},_defAttrChangeFn:function(O){if(!this._setAttrVal(O.attrName,O.subAttrName,O.prevVal,O.newVal)){O.stopImmediatePropagation();}else{O.newVal=this._conf.get(O.attrName,I);}},_setAttrVal:function(a,Z,V,U){var X=true,Y=this._conf,S=Y.get(a,D),W=Y.get(a,C),O=Z||a,T;if(!S||S.call(this,U,O)){if(W){T=W.call(this,U,O);if(T===N){X=false;}else{if(T!==undefined){U=T;}}}if(X){if(!Z&&U===V){X=false;}else{if(Y.get(a,M)===undefined){Y.add(a,M,U);}Y.add(a,I,U);}}}else{X=false;}return X;},setAttrs:function(S){for(var O in S){if(S.hasOwnProperty(O)){this.set(O,S[O]);}}return this;},getAttrs:function(U){var X={},V,S,O,W,T=(U===true);U=(U&&!T)?U:J.keys(this._conf.data[I]);for(V=0,S=U.length;V<S;V++){O=U[V];W=this.get(O);if(!T||this._conf.get(O,I)!=this._conf.get(O,M)){X[O]=this.get(O);}}return X;},addAttrs:function(S,T){if(S){var O,U,V;T=this._splitAttrVals(T);for(O in S){if(S.hasOwnProperty(O)){U=S[O];V=this._getAttrInitVal(O,U,T);if(V!==undefined){U.value=V;}this.addAttr(O,U);}}}return this;},_splitAttrVals:function(U){var W={},V={},X,O,T,S;for(S in U){if(U.hasOwnProperty(S)){if(S.indexOf(K)!==-1){X=S.split(K);O=X.shift();T=V[O]=V[O]||[];T[T.length]={path:X,value:U[S]};}else{W[S]=U[S];}}}return{simple:W,complex:V};},_getAttrInitVal:function(Y,W,a){var S=(W.valueFn)?W.valueFn.call(this):W.value,O,T,V,U,b,Z,X;if(!W[P]&&a){O=a.simple;if(O&&O.hasOwnProperty(Y)){S=O[Y];}T=a.complex;if(T&&T.hasOwnProperty(Y)){X=T[Y];for(V=0,U=X.length;V<U;++V){b=X[V].path;Z=X[V].value;J.setValue(S,b,Z);}}}return S;}};B.mix(A,Q,false,null,1);B.Attribute=A;},"@VERSION@",{requires:["event-custom"]});