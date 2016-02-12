export default function pending(gen) {

  function waitToResolve(next) {
    return next.value.then((data) => {
      let next = gen.next(data);
      if (!next.done)
        return waitToResolve(next);
      else
        return Promise.resolve(data);
    });
  }

  let next = gen.next();
  if (next.done)
    return Promise.resolve();
  return waitToResolve(next);

}
