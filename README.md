# lazarr
extremely rudimentary lazy eval arrays in js.

this is dumb and hella incomplete, so don't use this.

usage
```
Lazarr.Naturals()
  .map(i => i*2)
  .first(10)
  .reduce((acc, cur) => (acc + cur), 0)
  .toArr(); // gives [110]
```
