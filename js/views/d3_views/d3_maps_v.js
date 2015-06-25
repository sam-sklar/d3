define([
"views/d3_views/d3_utils_v",
"views/d3_views/d3_maps/d3_map_v",
"text!templates/d3_views/d3_maps.html"], 
function(D3_utils_v, d3_map, Templ_maps) 
{
	
	
	var D3_maps = D3_utils_v.extend({
		template:_.template(Templ_maps),
		initialize:function () {
			
			//D3_utils_v.prototype.initialize.call(this);
			
			
			this.congressional_districts 	   = [];
			this.congressional_districts_density = [];
			
			this.state_assembly_districts	 =  [];
			this.state_assembly_districts_density	 =  [];
			
			
			this.state_senate_districts	 =  [];
			this.state_senate_districts_density	 =  [];
			
			
			this.process();
			this.render();
			
			var map = new d3_map({el:"#all_maps",id:"map_1_svg"});
			map.map_data("js/data/us_congressional_districts_simpler.json",this.congressional_districts_density);
			
			var map = new d3_map({el:"#all_maps",id:"map_2_svg"});
			map.map_data("js/data/california_state_assembly_simpler.json",this.state_assembly_districts_density);
			
			var map = new d3_map({el:"#all_maps",id:"map_3_svg"});
			map.map_data("js/data/california_state_senate_districts_simpler.json",this.state_senate_districts_density);
			
					},
		
		process:function () {
			for(var i=0;i<this.collection.length;i++){
				//console.log(this.collection.at(i));
				
				var id = this.collection.at(i).get("congressional_district_id");
				var st_as_id = this.collection.at(i).get("state_assembly_district_id");
				var st_snt_id = this.collection.at(i).get("state_senate_district_id");
				
				
				if(!isNaN(id)){
					if(!this.congressional_districts[id]){
						this.congressional_districts[id] = [];
					}
					
					this.congressional_districts[id].push(id);
				}
				
				if(!isNaN(st_as_id)){
					if(!this.state_assembly_districts[st_as_id]){
						this.state_assembly_districts[st_as_id] = [];
					}
					
					this.state_assembly_districts[st_as_id].push(st_as_id);
				}
				
				if(!isNaN(st_snt_id)){
					if(!this.state_senate_districts[st_snt_id]){
						this.state_senate_districts[st_snt_id] = [];
					}
					
					this.state_senate_districts[st_snt_id].push(st_snt_id);
				}
				
				
				//this.state_assembly_districts
			
			}
			
			this.congressional_districts_density 	= this.calculate_density(this.congressional_districts);
			
			this.state_assembly_districts_density 	= this.calculate_density(this.state_assembly_districts);
		
			this.state_senate_districts_density 	= this.calculate_density(this.state_senate_districts);
			
			
						
		},
		render:function () {
			
			this.$el.html(this.template({}));
			
		},
		
		calculate_density:function (districts) {
		
			var districts_count = [];
			for(var k in districts){
				
							
						
			districts_count[k] = districts[k].length;
						
			}
			
			
			return districts_count;
		}
		
	});
	
	return D3_maps;

});