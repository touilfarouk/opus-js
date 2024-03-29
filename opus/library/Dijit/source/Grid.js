﻿opus.Class("opus.Dijit.Grid", {
	isa: opus.Dijit.Widget,
	fit: true,
	widgetClass: "dojox.grid.DataGrid",
	create: function() {
		this.inherited(arguments);
		this.widgetProps = {
			store: this.store || new dojo.data.ItemFileWriteStore({data: opus.Dijit.Grid.sampleData}),
			//query: "{ id: '*' }",
			structure: this.structure || opus.Dijit.Grid.structure,
			rowSelector: "20px"
		};
	},
	widgetCreated: function() {
		this.inherited(arguments);
		this.widget.startup();
	},
	widgetThemeChanged: function() {
		this.inherited(arguments);
		opus.apply(this.widget, "update");
	},
	renderWidgetBounds: function() {
		this.inherited(arguments);
		opus.apply(this.widget, "resize");
	}
});

// example sample data and code
(function(){
	// some sample data
	// global var "data"
	data = {
		identifier: 'id',
		label: 'id',
		items: []
	};
	data_list = [ 
		{ col1: "normal", col2: false, col3: "new", col4: 'But are not followed by two hexadecimal', col5: 29.91, col6: 10, col7: false },
		{ col1: "important", col2: false, col3: "new", col4: 'Because a % sign always indicates', col5: 9.33, col6: -5, col7: false },
		{ col1: "important", col2: false, col3: "read", col4: 'Signs can be selectively', col5: 19.34, col6: 0, col7: true },
		{ col1: "note", col2: false, col3: "read", col4: 'However the reserved characters', col5: 15.63, col6: 0, col7: true },
		{ col1: "normal", col2: false, col3: "replied", col4: 'It is therefore necessary', col5: 24.22, col6: 5.50, col7: true },
		{ col1: "important", col2: false, col3: "replied", col4: 'To problems of corruption by', col5: 9.12, col6: -3, col7: true },
		{ col1: "note", col2: false, col3: "replied", col4: 'Which would simply be awkward in', col5: 12.15, col6: -4, col7: false }
	];
	var rows = 100;
	for(var i=0, l=data_list.length; i<rows; i++){
		data.items.push(dojo.mixin({ id: i }, data_list[i%l]));
	}
	
	opus.Dijit.Grid.sampleData = data;

	opus.Dijit.Grid.structure = [[
		{name: 'Column 1', field: 'col1'},
		{name: 'Column 2', field: 'col2'},
		{name: 'Column 3', field: 'col3'},
		{name: 'Column 4', field: 'col4', width: "150px"},
		{name: 'Column 5', field: 'col5', width: "auto"}
	],[
		{name: 'Column 6', field: 'col6', colSpan: 2},
		{name: 'Column 7', field: 'col7'},
		{name: 'Column 8'},
		{name: 'Column 9', field: 'col3'}
	]];
})();

