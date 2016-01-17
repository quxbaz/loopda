import * as util from 'lib/util';

let doc = document;

describe("lib/util", () => {

  describe("uniqId()", () => {
    it("creates 1000 unique keys.", () => {
      let set = new Set(util.times(1000, util.uniqId));
      set.size.should.eql(1000);
    });
  });

  describe("each()", () => {
    it("iterates over an object.", () => {
      let vals = [];
      let keys = [];
      util.each({a:1, b:2}, (val, key) => {
        vals.push(val);
        keys.push(key);
      });
      vals.should.eql([1, 2]);
      keys.should.eql(['a', 'b']);
    });
  });

  describe("times()", () => {
    it("calls a function 5 times.", () => {
      let i = 0;
      util.times(5, () => i++);
      i.should.eql(5);
    });
  });

  describe("requireProps()", () => {
    it("does not throw an error on providing properties.", () => {
      let obj = {foo: 1, bar: 2};
      util.requireProps.bind(null, obj, ['foo']).should.not.throw();
      util.requireProps.bind(null, obj, ['foo', 'bar']).should.not.throw();
    });
    it("throws an error on not providing properties.", () => {
      let obj = {foo: 1, bar: 2};
      util.requireProps.bind(null, obj, ['qux']).should.throw();
    });
  });

  describe("constrain()", () => {
    it("returns a number within its proper range.", () => {
      util.constrain(5, [0, 10]).should.eql(5);
    });
    it("forces a minimum.", () => {
      util.constrain(-1, [0, 10]).should.eql(0);
    });
    it("forces a maximum.", () => {
      util.constrain(100, [0, 10]).should.eql(10);
    });
  });

  describe("fireOnce()", () => {
    it("triggers an event handler only once.", () => {
      let el = doc.createElement('button');
      let i = 0;
      util.fireOnce(el, 'click', () => i++);
      el.click();
      el.click();
      i.should.eql(1);
    });
  });

  describe("titleCase()", () => {
    it("title cases a word.", () => {
      util.titleCase('hello').should.eql('Hello');
    });
    it("title cases more than one word.", () => {
      util.titleCase('hey you there').should.eql('Hey You There');
    });
    it("title cases and provides a custom separator.", () => {
      util.titleCase('foo,bar,qux', ',').should.eql('Foo,Bar,Qux');
    });
  });

  describe("ifn", () => {
    it("returns a value on a true condition.", () => {
      util.ifn(true, 1).should.eql(1);
    });
    it("returns a different value on a false condition.", () => {
      util.ifn(false, 1, 2).should.eql(2);
    });
  });

});
