// poc for lazy arrays in JS

function Lazarr(generator){
  this[Symbol.iterator] = generator;
}

Lazarr.Naturals = function(){
  return new Lazarr(function*(){
    let int =  0;
    while(true){
      int++;
      yield int;
    }
  });
}

// ---

Lazarr.prototype.first = function(n = 1){
  const source = this;
  return new Lazarr(function*(){
    let pos = 0;
    let done = false;
    let genInstance = source[Symbol.iterator]();
    while(done === false && pos < n){
      res = genInstance.next();
      done = res.done;
      pos++;
      yield res.value;
    }
  });
};

Lazarr.prototype.toArr = function(){
  return [...this];
};

Lazarr.prototype.map = function(pred){
  let source = this;
  return new Lazarr(function*(elem){
    let done = false;
    let genInstance = source[Symbol.iterator]();
    while(done === false){
      res = genInstance.next();
      done = res.done;
      yield pred(res.value);
    }
  });
};

Lazarr.prototype.filter = function(pred){
  let source = this;
  return new Lazarr(function*(elem){
    let done = false;
    let genInstance = source[Symbol.iterator]();
    while(done === false){
      res = genInstance.next();
      done = res.done;
      if(pred(res)){
        yield res.value;
      }
    }
  });
}

Lazarr.prototype.reduce = function(reduceFn, initValue){
  if(initValue === undefined){
    throw "need an initial value";
  }
  let source = this;
  return new Lazarr(function*(elem){
    let done = false;
    yield [...source].reduce(reduceFn, initValue);
  });
}

Lazarr.prototype.concatAll = function(){
  let source = this;
  return new Lazarr(function*(elem){
    let done = false;
    yield [...source].reduce(reduceFn, initValue);
  });
};

module.exports = Lazarr;
