// // Styles
import 'bower_components/mocha/mocha.css';

// Libraries
require('chai').should();

// Tests
import './tests/lib/util';
import './tests/helpers/blip';

mocha.run();
