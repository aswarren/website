define([
	"dojo/_base/declare","dijit/_WidgetBase","dojo/on",
	"dojo/dom-class","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin",
	"dojo/text!./templates/Reconstruct.html","./AppBase",
	"dojo/_base/lang","../../WorkspaceManager",
	"../GenomeNameSelector"
], function(
	declare, WidgetBase, on,
	domClass,Templated,WidgetsInTemplate,
	Template,AppBase,lang,WorkspaceManager, genomeSelector
){
	return declare([AppBase], {
		baseClass: "Modeling",
		templateString: Template,
		applicationName: "ModelReconstruction",
		required: true,
		code_four: false,
		constructor: function(){

		},

        onSuggestNameChange: function(){
        },

		startup: function(){

            var _self=this;
            if (this._started) { return; }

            this.inherited(arguments);
            /*
            _self.defaultPath = WorkspaceManager.getDefaultFolder() || _self.activeWorkspacePath;
            _self.WorkspaceObjectSelector.set('value', _self.defaultPath);
            */
        },
		getValues: function(){
			var values = this.inherited(arguments);

			values.genome = 'PATRICSOLR:'+values.genome;
			values.fulldb = (values.fulldb && values.fulldb.length) ? 1 : 0;
			values.output_path = WorkspaceManager.getDefaultFolder()+'/models/';

			if (values.output_file === '') delete values['output_file'];

			console.log('Running reconstruct with', values)
			return values;
		}

	});
});
