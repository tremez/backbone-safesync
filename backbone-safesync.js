(function(_, Backbone) {
	var sync = Backbone.sync;

	Backbone.sync = function(method, model, options) {
		var lastXHR = model._lastXHR && model._lastXHR[method];
		var lastUrl = model._lastXHR && model._lastXHR['url'];

		if ((lastXHR && lastXHR.readyState != 4) && (options && options.safe !== false)){
			//If this is a same request - we dont want to repeat it and want to wait for finish, if url differs - cancel current
			if(lastUrl===model.url()){
				return lastXHR;
			}else{
				lastXHR.abort('stale');
			}

		}

		if (!model._lastXHR){
			model._lastXHR = {};
		}

		model._lastXHR['url']=model.url();
		return model._lastXHR[method] = sync.apply(this, arguments);
	};
})(window._, window.Backbone);
