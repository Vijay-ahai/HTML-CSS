function Kai(options) {
    this.el=options.el;
    this.data=options.data;
    Observe(this.data);
    this.compile=new Compile(this.el,this.data);

}

