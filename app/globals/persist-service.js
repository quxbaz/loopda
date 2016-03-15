/*
  <TODO> If things get slow, you can implement a buffer here and flush
  it at intervals.
*/

export default function(object) {
  if (object.save)
    object.save();
};
