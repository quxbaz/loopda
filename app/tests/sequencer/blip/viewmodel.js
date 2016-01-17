import {Blip} from 'sequencer';
import BlipViewModel from 'app/sequencer/blip/viewmodel';

describe("sequencer/blip/viewmodel", () => {

  let vm;
  let blip;

  beforeEach(() => {
    blip = new Blip();
    vm = new BlipViewModel(blip);
  });

  it("gets the value, min, and max of a blip property.", () => {
    blip.setState({
      rate: 1.2,
      minRate: 0,
      maxRate: 10
    });
    let {value, min, max} = vm.getValueMinMax('rate');
    value.should.eql(1.2);
    min.should.eql(0);
    max.should.eql(10);
  });

  it("returns a property value as proportion of its min/max.", () => {
    blip.setState({
      rate: 0,
      minRate: 0,
      maxRate: 4
    });
    vm.toPercent('rate').should.eql(0);
    blip.setState({rate: 1});
    vm.toPercent('rate').should.eql(25);
    blip.setState({rate: 2});
    vm.toPercent('rate').should.eql(50);
    blip.setState({rate: 3});
    vm.toPercent('rate').should.eql(75);
    blip.setState({rate: 4});
    vm.toPercent('rate').should.eql(100);
  });

  it("returns a property's proportion value as an actual value.", () => {
    blip.setState({
      minRate: 0,
      maxRate: 4
    });
    vm.toValue('rate', 0).should.eql(0);
    vm.toValue('rate', 25).should.eql(1);
    vm.toValue('rate', 50).should.eql(2);
    vm.toValue('rate', 75).should.eql(3);
    vm.toValue('rate', 100).should.eql(4);
  });

});
