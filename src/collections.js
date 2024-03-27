class Node {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
  }
}

class Folder extends Node {
  constructor(name, parent = null) {
    super(name, parent);
    this.childern = [];
    this.folders = {};
  }

  addNode(node) {
    node.parent = this;
    if (node instanceof Chats) {
      this.childern.push(node);
    }
    if (node instanceof Folder) {
      this.folders[node.name] = node;
    }
  }

  // deleteNode(node) {
  //   this.filter;
  // }
}

class Chats extends Node {
  constructor(name, url, parent) {
    super(name, parent);
    this.url = url;
  }
}
