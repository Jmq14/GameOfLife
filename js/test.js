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
    afterEach(function() {
      for (var i = 0; i < map.length; i ++){
        for (var j = 0; j < map[i].length; j++) {
          document.getElementById('test').removeChild(map[i][j]);
        }
      }
    });
    it('returns matrix whose height is equal to rows and width is equal to cols', function() {
      assert.strictEqual(height, 2);
      assert.strictEqual(width, 3);
    });
    it('adds cols*rows children doms to the parent dom ', function() {
      assert.strictEqual(document.getElementById('test').childNodes.length, 2*3);
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
    mask = random_init(mask, 2);
    var count = 0;
    for (var i = 0; i < mask.length; i ++){
      for (var j = 0; j < mask[i].length; j++) {
        if (mask[i][j] == 1) count++;
      }
    }
    assert.equal(count, 2);
  });
});

describe('update', function() {
  it('should be a function', function() {
    assert.isFunction(update);
  });
  it('has two arguments', function() {
    assert.equal(update.length, 2);
  });
  context('mask result', function() {
      var input_mask1, result_mask1;
      var input_mask2, result_mask2;
      var input_mask3, result_mask3;
      var input_mask4, result_mask4;
      beforeEach(function() {
        // Block
        input_mask1 = [
          [0,0,0,0],
          [0,1,1,0],
          [0,1,1,0],
          [0,0,0,0]
        ];  
        result_mask1 = [
          [0,0,0,0],
          [0,1,1,0],
          [0,1,1,0],
          [0,0,0,0]
        ];
        // Loaf
        input_mask2 = [
          [0,0,0,0,0,0],
          [0,0,1,1,0,0],
          [0,1,0,0,1,0],
          [0,0,1,0,1,0],
          [0,0,0,1,0,0],
          [0,0,0,0,0,0]
        ];
        result_mask2 = [
          [0,0,0,0,0,0],
          [0,0,1,1,0,0],
          [0,1,0,0,1,0],
          [0,0,1,0,1,0],
          [0,0,0,1,0,0],
          [0,0,0,0,0,0]
        ];

        // Blinker
        input_mask3 = [
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,1,1,1,0],
          [0,0,0,0,0],
          [0,0,0,0,0]
        ];
        result_mask3 = [
          [0,0,0,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,0,0,0]
        ];

        // Glider
        input_mask4 = [
          [0,0,0,0,0,0],
          [0,1,0,1,0,0],
          [0,0,1,1,0,0],
          [0,0,1,0,0,0],
          [0,0,0,0,0,0]
        ];
        result_mask4 = [
          [0,0,0,0,0,0],
          [0,0,0,1,0,0],
          [0,1,0,1,0,0],
          [0,0,1,1,0,0],
          [0,0,0,0,0,0]
        ];
      });
      it('update on still unit', function() {
        var output1 = update_mask(input_mask1);
        assert.sameDeepMembers(output1, result_mask1);
        var output2 = update_mask(input_mask2);
        console.log(output2);
        assert.sameDeepMembers(output2, result_mask2);
      });
      it('update on periodic unit', function() {
        var output3 = update_mask(input_mask3);
        assert.sameDeepMembers(output3, result_mask3);
        var output3_1 = update_mask(output3);
        assert.sameDeepMembers(output3_1, input_mask3);
      });
      it('update on translatinal unit', function() {
        var output4 = update_mask(input_mask4);
        assert.sameDeepMembers(output4, result_mask4);
      });
    });
});

describe('Interaction (buttons, inputs & outputs)', function() {
  it('should be a function', function() {
    assert.isFunction(update);
  });
  it('has two arguments', function() {
    assert.equal(random_init.length, 2);
  });
  it('starts game after clicking the [start] button', function() {
    var running = document.getElementById("start").onclick();
    assert.equal(running, true);
  });
  it('pauses game after clicking the [pause] button', function() {
    var running = document.getElementById("pause").onclick();
    assert.strictEqual(running, false);
  });
  it('resets game to random [input] living cells after clicking the [reset] button', function() {
    var num = 1000;
    document.getElementById("input").value=num.toString();
    var mask = document.getElementById("reset").onclick();
    var count = get_population(mask);
    assert.strictEqual(count, num);
  });
  it('shows the right population number', function() {
    var p = parseInt(document.getElementById("population").innerHTML);
  });
});


