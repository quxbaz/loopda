import {Blip} from 'sequencer';
import helper from 'helpers/blip';

describe("helpers/blip", () => {

  let blip;

  beforeEach(() => {
    blip = new Blip();
  });

  it("gets the value, min, and max of a blip property.", () => {
    blip.setState({
      rate: 1.2,
      minRate: 0,
      maxRate: 10
    });
    let {value, min, max} = helper.getValueMinMax(blip, 'rate');
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
    helper.toPercent(blip, 'rate').should.eql(0);
    blip.setState({rate: 1});
    helper.toPercent(blip, 'rate').should.eql(25);
    blip.setState({rate: 2});
    helper.toPercent(blip, 'rate').should.eql(50);
    blip.setState({rate: 3});
    helper.toPercent(blip, 'rate').should.eql(75);
    blip.setState({rate: 4});
    helper.toPercent(blip, 'rate').should.eql(100);
  });

  it("returns a property's proportion value as an actual value.", () => {
    blip.setState({
      minRate: 0,
      maxRate: 4
    });
    helper.toValue(blip, 'rate', 0).should.eql(0);
    helper.toValue(blip, 'rate', 25).should.eql(1);
    helper.toValue(blip, 'rate', 50).should.eql(2);
    helper.toValue(blip, 'rate', 75).should.eql(3);
    helper.toValue(blip, 'rate', 100).should.eql(4);
  });

});
