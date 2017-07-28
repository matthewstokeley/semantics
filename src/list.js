
/**
 * [semantic.List description]
 * @param {[type]} options [description]
 */
var semantic.List = function semantic.List(options) {
	this.returnString = options.returnString || true;
	this.rootId = options.rootId;
	this.role = options.role;
	this.classList = options.classList;
	this.data = options.data || {};
	this.order = options.order || 'ul';
	this.init(options);
};

/**
 * [init description]
 * @param  {Object} options 
 * @return {Object} returns the class context
 */
semantic.List.prototype.init = function(options) {
	return this.setItems(options.items)
		.setLinks(options.items.map(function(item) { return item.link; }))
		.setItemNodes()
		.setLinkNodes()
		.setListNode()
		.setDocument()
		.setString();
};

/**
 * [setItems description]
 * @chainable
 * @param {Array} items    array of list items
 */
semantic.List.prototype.setItems = function(items) {
	this.items = items.map(this.itemFactory.bind(this));
	return this;
};

/**
 * [setLinks description]
 * @chainable
 * @param {Array} links     array of list links
 */
semantic.List.prototype.setLinks = function(links) {
	this.links = links.map(this.linkFactory.bind(this));
	return this;
};

/**
 * [itemFactory description] 
 * @param  {Object} item
 * @return {Object}
 */
semantic.List.prototype.itemFactory = function(item) {
	return {
		name: item.name,
		id: (item.id) ? item.id : item.name,
		classList: item.classList ? [this.rootId + '--link'].concat(item.classList) : [this.rootId + '--item'],
		dataset: item.data ? item.data : {}
	};
};

/**
 * [linkFactory description]
 * @param  {Object} link
 * @return {Object}
 */
semantic.List.prototype.linkFactory = function(link) {
	return {
		name: link.name,
		text: link.value,
		href: link.href ? link.href : 'javascript:;',
		id: link.id ? link.id : link.name,
		title: link.title ? link.title : link.name,
		classList: link.classList ? [this.rootId + '--link'].concat(link.classList) : [this.rootId + '--link'],
		dataset: link.data ? link.data : {}
	}
};

/**
 * [setItemNodes description]
 * @chainable
 */
semantic.List.prototype.setItemNodes = function() {
	this.itemNodes = this.items.map(this.createItemNode.bind(this));
	return this;
};

/**
 * [setLinkNodes description]
 * @chainable
 */
semantic.List.prototype.setLinkNodes = function() {
	this.linkNodes = this.links.map(this.createLinkNode.bind(this));
	return this;
};

/**
 * [setListNode description]
 * @chainable
 */
semantic.List.prototype.setListNode = function() {
	this.listNode = $.createElement({
		element: this.order,
		properties: {
			id: this.rootId,
			classList: this.classList,
			role: this.role
		}
	});
	return this;
};

/**
 * [createItemNode description]
 * @chainable
 * @param  {Object} item
 * @return {Object}
 */
semantic.List.prototype.createItemNode = function(item) {
	return $.createElement({
		element: 'li',
		properties: item
	});
	return this;
};

/**
 * [createLinkNode description]
 * @param  {Object} link [description]
 * @return {Object}      [description]
 */
semantic.List.prototype.createLinkNode = function(link) {
	return $.createElement({
		element: 'a',
		properties: link
	});
};

/**
 * [createDocument description]
 * @return {Node}
 */
semantic.List.prototype.createDocument = function() {
	return $.createListFragment(this.listNode, this.itemNodes, this.linkNodes);
};

/**
 * [setDocument description]
 * @chainable
 */
semantic.List.prototype.setDocument = function() {
	this.document = this.createDocument();
	return this;
};

/**
 * [getDocument description]
 * @return {Node}
 */
semantic.List.prototype.getDocument = function() {
	return this.document;
};

/**
 * [createString description]
 * @return {String}
 */
semantic.List.prototype.createString = function() {
	return this.document.outerHTML;
};

/**
 * [setString description]
 * @chainable
 */
semantic.List.prototype.setString = function() {
	this.string = this.createString();
	return this;
};

/**
 * [getString description]
 * @return {String} [description]
 */
semantic.List.prototype.getString = function() {
	return this.string;
};

/**
 * [appendToNode description]
 * @chainable
 * @param  {Node}
 * @return {Object}
 */
semantic.List.prototype.appendToNode = function(node) {
	node.appendChild(this.document);
	return this;
};