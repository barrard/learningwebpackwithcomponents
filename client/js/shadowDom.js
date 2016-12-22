
module.exports={

	createBox:function(){
		var BoxProto =  Object.create(HTMLElement.prototype);

		BoxProto.createdCallback = function(){
			var shadow = this.createShadowRoot();
			var div = document.createElement('div');
			// div.innerText = this.getAttribute('data-text');
			// div.height = this.getAttribute('data-height');
			// div.width = this.getAttribute('data-width');
			div.width = '150';
			div.height = '150';
			shadow.appendChild(div);
			div.addEventListener('click', function(e) {
				alert(e)
			});

		}
		var Box = document.registerElement('my-box', {
		    prototype: BoxProto
		});
	},

	createHTMLObject:function(){
var XProductProto = Object.create(HTMLElement.prototype);
		XProductProto.createdCallback = function(){
			// Create a Shadow Root
			   var shadow = this.createShadowRoot();

			   // Create an img element and set it's attributes.
			   var img = document.createElement('img');
			   img.alt = this.getAttribute('data-name');
			   img.src = this.getAttribute('data-img');
			   img.width = '250';
			   img.height = '150';
			   img.className = 'product-img';

			   // Add the image to the Shadow Root.
			   shadow.appendChild(img);

			   // Add an event listener to the image.
			   img.addEventListener('click', function(e) {
			       window.location = this.getAttribute('data-url');
			   });

			   // Create a link to the product.
			   var link = document.createElement('a');
			   link.innerText = this.getAttribute('data-name');
			   link.href = this.getAttribute('data-url');
			   link.className = 'product-name';

			   // Add the link to the Shadow Root.
			   shadow.appendChild(link);


		}
		XProductProto.attachedCallback = function(){
			console.log('attachedCallback')

		}
		XProductProto.detachedCallback = function(){
			console.log('detachedCallback')

		}
		XProductProto.attributeChangedCallback = function(attrName, oldValue, newValue){
			console.log('attributeChangedCallback ')
			for(var x = 0;x<arguments.length;x++){
				console.log(x+' : '+arguments[x])
			}


		}

		var XProduct = document.registerElement('x-product', {
		    prototype: XProductProto
		});


	},
	addProp:function(objectProto, propString, valueObject){
		if(typeof propString != 'string')return
		Object.defineProperty(objectProto, propString, valueObject)
	},



	appendNewCustomElement:function(elementName, Prototype, text){
	if((typeof arguments[0] != 'string')||(arguments[0].indexOf('-')<0)) return //emit error and data
	
	if(!NewElement){
		var NewElement = document.registerElement(elementName.toLowerCase(),  { 
		    prototype: Prototype
		});

	} 
	NewElement.innerHTML=text
	var newelement = new NewElement();
	document.body.appendChild(newelement);


	

	},


}