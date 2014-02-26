functional = require('../../FunctionalJS/functional')
functional.expose()

prelude = require('../prelude')
prelude.expose()

describe('preludeJS', () ->
  it('loads and requires properly', ->
    expect(prelude).not.toBeUndefined()
    expect(typeof prelude.argsToList).toEqual('function')
  )
  
  describe('expose', ->
    it('can attach functions to the global namespace', ->
      expect(typeof prelude.expose).toEqual('function')
      expect(typeof argsToList).toEqual('function')
    )
  )

  describe('helpers', () ->
    describe('isArray', ()->
      it('tests for Array', ()->
        expect(isArray([])).toBeTruthy()
        expect(isArray({})).toBeFalsy()
      )
    )

    describe('isObj', () ->
      it('tests for Object', () ->
        expect(isObj([])).toBeFalsy()
        expect(isObj({})).toBeTruthy()
      )
    )

    describe('isNumber', ()->
      it('test for float or integer',()->
        expect(isNumber(3)).toBeTruthy()
        expect(isNumber(-1)).toBeTruthy()
        expect(isNumber(0.42)).toBeTruthy()
        expect(isNumber(-0.42)).toBeTruthy()
        expect(isNumber(-1.42)).toBeTruthy()
        expect(isNumber(1.42)).toBeTruthy()
        expect(isNumber({})).toBeFalsy()
        expect(isNumber('a')).toBeFalsy()
        expect(isNumber([])).toBeFalsy()
      )
    )

    describe('nTimes', ()->
      it('runs a function n times and returns output n times in list', ()->
        returnHellos = () -> "hello"
        list = nTimes(3, returnHellos)
        expect(list).toEqual(['hello', 'hello', 'hello'])
      )

      it('runs a function n times and returns output n times in list', ()->
        obj = {prop: 2}
        returnObj = () -> obj
        list = nTimes(3, returnObj)
        expect(list).toEqual([obj,obj,obj])
      )

      it('returns undefined n times when value is not returned from function', ()->
        expect(nTimes(2, (()->))).toEqual([undefined, undefined])
      )
    )

    describe('log', ()->
      it('logs the input to STDOUT and returns input as output', ()->
        output = log('.')
        expect(output).toEqual('.')
      )
    )

    describe('log2', ()->
      it('logs a message and input, returns input as output', ()->
        output = log2('.', '.')
        expect(output).toEqual('.')
      )
    )
  )

  describe('Array', ()->
    describe('take', ()->
      it('takes a number of elements from an array', ()->
        three_elems = take(3, [1,2,3,4])
        expect(three_elems).toEqual([1,2,3])
      )

      it('takes only amount of elements it can from array', ()->
        all = take(5, [1,2])
        expect(all).toEqual([1,2])
        none = take(5, [])
        expect(none).toEqual([])
      )
    )

    describe('drop', ()->
      it('drops a number of elements from an array', ()->
        three_elems = drop(2, [1,2,3,4,5])
        expect(three_elems).toEqual([3,4,5])
      )

      it('drops only amount of elements it can from array', ()->
        all = drop(5, [1,2])
        expect(all).toEqual([])
        none = drop(0, [1,2])
        expect(none).toEqual([1,2])
      )
    )

    describe('unshift', ()->
      it('adds second arg to end of an array', ()->
        expect(unshift(['x'],[2])).toEqual([2,'x'])
      )

      it('flattens array', ()->
        expect(unshift(['x'],[2])).not.toEqual([2,['x']])
      )
    )

    describe('cons', ()->
      it('adds an elem to the beginning of array', ()->
        expect(cons([1],[2])).toEqual([[1], 2])
      )

      it('doesnt flatten array', ()->
        expect(cons([1],[2])).not.toEqual([[1], [2]])
      )
    )

    describe('concat', ()->
      it('adds second arg to end of an array', ()->
        expect(concat([2], 'x')).toEqual([2, 'x'])
      )

      it('flattens array', ()->
        expect(concat(['x'],[2])).toEqual(['x',2])
      )
    )

    describe('first', ()->
      it('returns first elem of an array', ()->
        expect(first([2, 'x', 3])).toEqual(2)
      )

      it('returns undefined if array is empty', ()->
        expect(first([])).toBeUndefined()
      )
    )

    describe('rest', ()->
      it('drops the first element of the array and returns the rest of array', ()->
        expect(rest([1,2,3])).toEqual([2,3])
      )

      it('returns an empty array if supplied with empty array', ()->
        expect(rest([])).toEqual([])
      )
    )

    describe('last', ()->
      it('returns last elem of an array', ()->
        expect(last([2, 'x', 3])).toEqual(3)
      )

      it('returns undefined if array is empty', ()->
        expect(last([])).toBeUndefined()
      )
    )

    describe('join', ()->
      it('joins elems of an array with token supplied', ()->
        expect(join('-', ['h', 'e', 'l', 'l', 'o'])).toEqual('h-e-l-l-o')
      )

      it('only joins array elements of type String', ()->
        expect(join('-', [{}, []])).not.toEqual('{}-[]')
      )
    )

    describe('groupsOf', ()->
      it('takes number and array and returns a new array with arrays of elements with length of number supplied for each inner array', ()->
        expect(groupsOf(3, [1,2,3,4,5,6])).toEqual([[1,2,3],[4,5,6]])
        expect(groupsOf(4, [1,2,3,4,5,6])).toEqual([[1,2,3,4],[5,6]])
      )

      it('takes only as much as it can from array', ()->
        expect(groupsOf(4, [1,2,3])).toEqual([[1,2,3]])
      )

      it('returns empty array if supplied empty array', ()->
        expect(groupsOf(4, [])).toEqual([])
      )
    )

    describe('zipWith', ()->
      it('zips two lists with supplied function', ()->
        zip_func = '+'
        xs = [1,2,3]
        ys = [1,2,3]
        expect(zipWith(zip_func, xs, ys)).toEqual([2,4,6])
      )
    )

    describe('uniq', ()->
      it('returns only unique values in array', ()->
        expect(uniq([1,2,2,3,3,3])).toEqual([1,2,3])
        expect(uniq([1,1])).not.toEqual([1,1])
      )

      it('returns an empty array if supplied with empty array', ()->
        expect(uniq([])).toEqual([])
      )
    )

    describe('uniqBy', ()->
      it('takes a function to check array for function return value and returns unique array', ()->
        expect(uniqBy('.id', [{id: 1},{id: 2},{id: 1}])).toEqual([{id:1},{id:2}])
      )
    )

    describe('reverse', ()->
      it('reverses a string or an array of strings to a string', ()->
        expect(reverse('linux')).toEqual('xunil')
        expect(reverse(['l','i','n','u','x'])).toEqual(['x','u','n','i','l'])
      )

      it('reverses an array of non strings to an array', ()->
        expect(reverse([1,2,3])).toEqual([3,2,1])
        expect(reverse([1,2,{}])).toEqual([{},2,1])
      )
    )

    describe('sort', ()->
      it('sorts an array of homogenous values', ()->
        expect(sort([1,78,2])).toEqual([1,2,78])
        expect(sort(['c','z','a'])).toEqual(['a','c','z'])
      )

      it('sorts numbers ascending', ()->
        expect(sort([1,100,2,78])).toEqual([1,2,78,100])
      )

      it('doesnt sort heterogenous values, must be equatable constraint', ()->
        expect(sort([1,100,'a'])).not.toEqual(['a',1,100])
        expect(sort([1,100,'a'])).not.toEqual([1,'a',100])
      )
    )

    describe('element', ()->
      it('test if an element is present in array', ()->
        expect(element([1,2,3], 1)).toBeTruthy()
        expect(element([1,'b',3], 'b')).toBeTruthy()
        expect(element([1,2,3], 5)).toBeFalsy()
      )
    )

    describe('flatten', ()->
      it('flattens single level deep nested arrays into a single array', ()->
        single_nested_arrays = [[2,3],[1],[5]]
        expect(flatten(single_nested_arrays)).toEqual([2,3,1,5])
        double_nested_arrays = [1,[2],[[3]]]
        expect(flatten(double_nested_arrays)).toEqual([1,2,[3]])
      )
    )

    describe('sortBy', ()->
      it('sorts by property', ()->
        obj1= {name: 'alice'}
        obj2 = {name: 'bob'}
        expect(sortBy('.name', [obj2,obj1])).toEqual([obj1,obj2])
      )
    )

    describe('groupBy', ()->
      it('groups elems in array by predicate function and returns hash with keys true and false', ()->
        expect(groupBy('>4', [1,2,3,4,5,6,7,8])).toEqual({false: [1,2,3,4], true: [5,6,7,8]})
      )
    )
  )

  describe('String', ()->
    describe('strip', ()->
      it('relaces all whitespace with empty string', ()->
        str = '  a g  ba df '
        expect(strip(str)).toEqual('agbadf')
      )
    )

    describe('split', ()->
      it('splits a string based on token supplied and returns array', ()->
        str = 'h-e-l-l-o'
        expect(split('-', str)).toEqual(['h','e','l','l','o'])
        expect(split('a', str)).toEqual([str])
      )
    )

    describe('test', ()->
      it('tests to see if a regex matches in the string and returns predicate', ()->
        str = 'hello world'
        expect(test(/h/, str)).toBeTruthy()
        expect(test(/a/, str)).toBeFalsy()
      )
    )

    describe('match', ()->
      it('test if a regex matches the string and returns match array', ()->
        str = 'hello world'
        expect(match(/h/, str)[0]).toEqual('h')
      )
    )

    describe('replace', ()->
      it('replaces patterns in the string with substitution supplied', ()->
        str = 'hello world'
        expect(replace(/hello/,'goodbye', str)).toEqual('goodbye world')
        expect(replace(/l/,'x', str)).toEqual('hexlo world')
        expect(replace(/l/g,'x', str)).toEqual('hexxo worxd')
      )
    )
  )

  describe('Conditional', ()->
    describe('when', ()->
      xit('takes a predicate function and other function, when predicate function returns true it applies other function to args', ()->
        #TODO: when function conflicts with coffeescript when keyword, wont run spec
        #true_func = () -> true
        #false_func = () -> false
        #my_func = () -> 'lamp'
        #output = when(true_func, my_func)()
        #expect(output).toEqual('lamp')
        #output = when(false_func, my_func)()
        #expect(output).toBeUndefined()
      )
    )

    describe('ifelse', ()->
      it('takes a function, returns true, runs first function', ()->
        true_func = ()-> true
        func_called_output = ifelse(true_func, (()-> 'im the true path'), id)()
        expect(func_called_output).toEqual('im the true path')
      )

      it('takes a function, returns false, runs second function', ()->
        false_func = ()-> false
        func_called_output = ifelse(false_func, id,(()-> 'im the false path'))()
        expect(func_called_output).toEqual('im the false path')
      )
    )

    describe('negate', ()->
      it('turns true to false', ()->
        expect(negate(false)).toBeTruthy()
      )

      it('turns false to true', ()->
        expect(negate(true)).toBeFalsy()
      )
    )

    describe('andand', ()->
      it('returns true if both args are true', ()->
        expect(andand(true, true)).toBeTruthy()
        expect(andand(true, 'a')).toBeTruthy()
      )

      it('returns false if first arg is false', ()->
        expect(andand(false, true)).toBeFalsy()
        expect(andand(0, true)).toBeFalsy()
        expect(andand(null, true)).toBeFalsy()
        expect(andand(undefined, true)).toBeFalsy()
        expect(andand('', true)).toBeFalsy()
      )

      it('returns false if second arg is false', ()->
        expect(andand(true, false)).toBeFalsy()
        expect(andand(true, 0)).toBeFalsy()
        expect(andand(true, null)).toBeFalsy()
        expect(andand(true, undefined)).toBeFalsy()
        expect(andand(true, '')).toBeFalsy()
      )
    )

    describe('oror', ()->
      it('returns true if first arg is true', ()->
        expect(oror(true, false)).toBeTruthy()
      )

      it('returns true if second arg is true', ()->
        expect(oror(false, true)).toBeTruthy()
        expect(oror(0, true)).toBeTruthy()
        expect(oror(null, true)).toBeTruthy()
        expect(oror(undefined, true)).toBeTruthy()
        expect(oror('', true)).toBeTruthy()
      )

      it('returns false if both args are false', ()->
        expect(oror(false, false)).toBeFalsy()
      )
    )
  )

  describe('Object', ()->
    describe('setVal', ()->
      it('sets a value on an object', ()->
        obj = {}
        setVal('prop', obj, 'set')
        expect(obj.prop).toEqual('set')
      )

      it('returns the value that was set', ()->
        obj = {}
        return_val = setVal('prop', obj, 'set')
        expect(return_val).toEqual('set')
      )
    )

    describe('getVal', ()->
      it('returns a function that returns the value of some property on an object', ()->
        obj = {prop: 'set'}
        get_val_func = getVal('prop', obj)
        expect(get_val_func()).toEqual('set')
      )
    )

    describe('merge', ()->
      it('merges one object into another and returns new obj', ()->
        obj1 = {arr: [1], num: 2}
        obj2 = {}
        new_obj = merge(obj1, obj2)
        expect(new_obj.arr).toEqual([1])
        expect(new_obj.num).toEqual(2)
      )

      it('deep merges object', ()->
        obj1 = {a_obj: {num: 9}}
        obj2 = {}
        new_obj = merge(obj1, obj2)
        expect(new_obj.a_obj.num).toEqual(9)
      )

      it('merges functions', ()->
        obj1 = {a_func: () -> 7}
        obj2 = {}
        new_obj = merge(obj1, obj2)
        expect(new_obj.a_func()).toEqual(7)
      )
    )

    describe('unionWith', ()->
      it('adds to values from keys of objects', ()->
        obj1 = {first_name:'Bob', last_name:'Barker'}
        obj2 = {first_name:'Happy', last_name:'Gilmore'}
        expect(unionWith('+',obj1,obj2)).toEqual({first_name:'BobHappy', last_name:'BarkerGilmore'})
      )
    )
  )

  describe('Math', ()->
    describe('random', ()->
      it('returns a random value from 0 to n', ()->
        expect(random(5)).toBeLessThan(6)
        expect(random(5)).toBeGreaterThan(-1)
        expect(random(-5)).toBeLessThan(1)
        expect(random(-5)).toBeGreaterThan(-6)
      )
    )

    describe('subtract', ()->
      it('subtracts two scalar values', ()->
        expect(subtract(3, 5)).toEqual(2)
        expect(subtract(5, 3)).toEqual(-2)
        expect(subtract(3.2, 4.2)).toEqual(1)
      )
    )

    describe('sum', ()->
      it('sums an array of values', ()->
        expect(sum([1,2,3,4,5,6,7,8,9])).toEqual(45)
        expect(sum([1,2.2,3,4,5,6,7,8,9])).toEqual(45.2)
      )
    )

    describe('div', ()->
      it('divides to scalar values', ()->
        expect(div(10,5)).toEqual(2)
        expect(div(2,10)).toEqual(div(1,5))
      )
    )

    describe('average', ()->
      it('averages an array of values and returns a float', ()->
        expect(average([4,8])).toEqual(6.0)
        expect(average([0,4,8])).toEqual(6.0)

      )
    )

    describe('Other', ()->
      describe('repeat', ()->
        it('repeats the argument n times and returns array of length n', ()->
          expect(repeat(4, 3)).toEqual([4,4,4])
          expect(repeat('a', 3)).toEqual(['a', 'a', 'a'])
          expect(repeat([1], 3)).toEqual([[1], [1], [1]])
          expect(repeat({a:1}, 3)).toEqual([{a:1},{a:1},{a:1}])
        )
      )
    )
  )
)
