describe('generate_map', function() {
  it('should be a function', function() {
    assert.isFunction(generate_map);
  });
  it('has three arguments', function() {
    assert.equal(generate_map.length, 3);
  });
  context('result', function() {
    var map;
    var height = 0;
    var width = 0;
    beforeEach(function() {
      map = generate_map(document.getElementById('test'), 2, 3);
      height = map.length;
      width = map[0].length;
    });
  
    it('returns matrix whose height is equal to rows and width is equal to cols', function() {
      assert.strictEqual(height, 2);
      assert.strictEqual(width, 3);
      for (var i = 0; i < map.length; i ++){
        for (var j = 0; j < map[i].length; j++) {
          document.getElementById('test').removeChild(map[i][j]);
        }
      }
    });
    it('adds cols*rows children doms to the parent dom ', function() {
      assert.strictEqual(document.getElementById('test').childNodes.length, 2*3);
      for (var i = 0; i < height; i ++){
        for (var j = 0; j < width; j++) {
          document.getElementById('test').removeChild(map[i][j]);
        }
      }
    });
  });
});

describe('generate_mask', function() {
  it('should be a function', function() {
    assert.isFunction(generate_mask);
  });
  it('has two arguments', function() {
    assert.equal(generate_mask.length, 2);
  });
  context('result', function() {
    var mask;
    var height = 0;
    var width = 0;
    beforeEach(function() {
      mask = generate_mask(2, 3);
      height = mask.length;
      width = mask[0].length;
    });
    it('returns matrix whose height is equal to rows and width is equal to cols', function() {
      assert.strictEqual(height, 2);
      assert.strictEqual(width, 3);
    });
    it('returns matrix whose values are zeros', function() {
       for (var i = 0; i < height; i ++){
        for (var j = 0; j < width; j++) {
          assert.strictEqual(mask[i][j], 0);
        }
      }
    });
  });
});

describe('random_init', function() {
  it('should be a function', function() {
    assert.isFunction(random_init);
  });
  it('has two arguments', function() {
    assert.equal(random_init.length, 2);
  });
  it('returns mask with [num] living cells', function() {
    var mask = [[0,0,0], [0,0,0]];
    var mask = random_init(mask, 2);
    var count = 0
    for (var i = 0; i < mask.length; i ++){
      for (var j = 0; j < mask[i].length; j++) {
        if (mask[i][j] == 1) count++;
      }
    }
    assert.equal(count, 2);
  });
});