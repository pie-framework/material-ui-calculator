(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){

function Node(type) {
  return function _Node(nodes, attrs) {
    if(!(Array.isArray(nodes) && nodes.length)) {
      var msg = 'Node "'+type+'" needs an array of at least one subnode.';
      throw new Error(msg);
    }
    return {
      type: type,
      nodes: nodes,
      attrs: attrs,
    };
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

var types = [
  'assignment',
  'exponentiation',
  'multiplication',
  'division',
  'addition',
  'subtraction',
  'negation',
  'modulo',
  'function',
  'variable',
  'number',
];

var ast = types.reduce(function(obj, type) {
  obj[capitalize(type)] = Node(type);
  return obj;
}, {});

module.exports = ast;


},{}],2:[function(require,module,exports){

var operations = {
  number: function _number(ns) {return ns;},
  negation: function _negation(ns) {return -ns;},
  'function': function _function(ns, val, idx, list) {
    if(idx > 1) return ns;
    if(typeof ns !== 'function') {
      var msg = 'Function "'+ns+'" is not a function.';
      throw new Error(msg);
    }
    return ns.apply(null, list.slice(1));
  },

  addition: function addition(x,y) {return x+y;},
  subtraction: function subtraction(x,y) {return x-y;},
  multiplication: function multiplication(x,y) {return x*y;},
  division: function division(x,y) {return x/y;},
  exponentiation: function exponentiation(x,y) {return Math.pow(x,y);},

  modulo: function modulo(x,y) {return x%y},
  assignment: function assignment(x, y) {return y;},
};

function compute(exp) {
  if(typeof exp === 'number') return exp;
  var fn;
  if (fn = operations[exp.type]) {
    if(exp.type === 'negation') exp.nodes.push(0); // exec hack
    return exp.nodes.map(compute).reduce(fn);
  } else {
    var msg = 'Node type "'+exp.type+'" not recognized for \n'+
              JSON.stringify(exp);
    throw new Error(msg);
  }
}

module.exports = compute;


},{}],3:[function(require,module,exports){

var parse = require('./parse');
var compute = require('./compute');

function symbolicSolveFor(left, right) {
  var result = {success: false}; 
  return result;
}

function findNode(tree, predicate) {
  var searchSet = [tree];
  var node;
  while(searchSet.length) {
    node = searchSet.shift();
    if(predicate(node)) return node;
    node.nodes.forEach(function(x) {
      if(typeof x === 'object') {
        searchSet.push(x);
      }
    });
  }
  return undefined;
}

function findNodes(tree, predicate) {
  var searchSet = [tree];
  var nodes = [];
  while(searchSet.length) {
    node = searchSet.shift();
    if(predicate(node)) nodes.push(node);
    node.nodes.forEach(function(x) {
      if(typeof x === 'object') {
        searchSet.push(x);
      }
    });
  }
  return nodes;
}

function solveFor(exp, variableName) {
  var equalities = findNode(exp, function(x) {
    return x.type === 'assignment';
  });
  if(!equalities.length) {
    var msg = "Equation not provided, unable to solve for \""+variableName+"\"."
    throw new Error(msg); 
  }

  var totalVarCount = 0;
  var eqs = equalities.map(function(eq) {
    var side = {};
    side.equality = eq;
    side.varNodes = findNodes(eq, function(x) {
      return x.type === 'variable' && x.nodes[0] === variableName;
    });
    side.varCount = side.varNodes.length;
    totalVarCount += side.varCount;
    return side;
  }).sort(function(a, b) {
    return b.varCount - a.varCount;
  });

  if(!totalVarCount) {
    var msg = "Variable \""+variableName+"\" not found in equation.";
    throw new Error(msg);
  }

  var leastVarIndex = 0;
  while(eqs[leastVarIndex].varCount === 0) leastVarIndex++;

  var impotentEqs = eqs.slice(0, leastVarIndex);
  var variableEqs = eqs.slice(leastVarIndex);
  
  var iLen = impotentEqs.length;
  var vLen = variableEqs.length;
  
  var attempts = 0;
  for(var v = 0; v < vLen; v++) {
    for(var i = 0; i < iLen; i++) {
      attempts++;
      variableEq = variableEqs[v];
      impotentEq = impotentEqs[i];
      var result = symbolicSolveFor(variableEq, impotentEqs);
      if(result.success) {
        return result.expression;
      }
    }
  }

  var msg = "After \""+attempts+"\" tries, the variable \""+variableName+"\" was not solved for.";
  throw new Error(msg);
}

function Context(expressions, constants) {
  return {
    expressions: expressions,
    constants: constants,
  };
}

function evaluate(expression, context) {
  context = context || Context([], Math);
  // populate variables and functions
  return expression;
}

module.exports = {
  parse: parse,
  evaluate: evaluate,
  Context: Context,
  compute: compute,
  solveFor: solveFor,
};


},{"./compute":2,"./parse":6}],4:[function(require,module,exports){
// Generated automatically by nearley, version 2.12.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
 var ast = typeof window !== 'undefined' ? window.ast : require('./ast.js'); var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["_", "EXP", "_"], "postprocess": function(d) { return d[1]; }},
    {"name": "_", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "_", "symbols": ["_", /[\s]/], "postprocess": function(d) {return null;}},
    {"name": "CHAR$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "CHAR$ebnf$1", "symbols": ["CHAR$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "CHAR", "symbols": ["CHAR$ebnf$1"], "postprocess": function(d) {return d[0].join(""); }},
    {"name": "STRING", "symbols": ["CHAR"], "postprocess": function(d) {return d[0];}},
    {"name": "VAR", "symbols": ["STRING"], "postprocess": function(d) {return ast.Variable([d[0]]); }},
    {"name": "INT$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "INT$ebnf$1", "symbols": ["INT$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "INT", "symbols": ["INT$ebnf$1"], "postprocess": function(d) {return d[0].join("");}},
    {"name": "DECIMAL", "symbols": ["INT", {"literal":"."}, "INT"], "postprocess": function(d) {return parseFloat(d[0] + d[1] + d[2]);}},
    {"name": "DECIMAL", "symbols": ["INT"], "postprocess": function(d) {return parseInt(d[0]);}},
    {"name": "NUM", "symbols": ["DECIMAL"], "postprocess": function(d) {return ast.Number([d[0]]);}},
    {"name": "VAL", "symbols": ["VAR"]},
    {"name": "VAL", "symbols": ["NUM"]},
    {"name": "FUNC", "symbols": ["STRING"]},
    {"name": "ADD", "symbols": [{"literal":"+"}]},
    {"name": "SUB", "symbols": [{"literal":"-"}]},
    {"name": "MUL", "symbols": [{"literal":"*"}]},
    {"name": "DIV", "symbols": [{"literal":"/"}]},
    {"name": "MOD", "symbols": [{"literal":"%"}]},
    {"name": "POW", "symbols": [{"literal":"^"}]},
    {"name": "SET", "symbols": [{"literal":"="}]},
    {"name": "EXP", "symbols": ["ASSIGNMENT"]},
    {"name": "ASSIGNMENT", "symbols": ["ASSIGNMENT", "_", "SET", "_", "ADD_SUB"], "postprocess": function(d) {return ast.Assignment([d[0], d[4]]);}},
    {"name": "ASSIGNMENT", "symbols": ["ADD_SUB"], "postprocess": id},
    {"name": "ADD_SUB", "symbols": ["ADD_SUB", "_", "ADD", "_", "MUL_DIV"], "postprocess": function(d) {return ast.Addition([d[0], d[4]]);}},
    {"name": "ADD_SUB", "symbols": ["ADD_SUB", "_", "SUB", "_", "MUL_DIV"], "postprocess": function(d) {return ast.Subtraction([d[0], d[4]]);}},
    {"name": "ADD_SUB", "symbols": ["MUL_DIV"], "postprocess": id},
    {"name": "MUL_DIV", "symbols": ["MUL_DIV", "_", "MUL", "_", "EXPONENTIATION"], "postprocess": function(d) {return ast.Multiplication([d[0], d[4]]);}},
    {"name": "MUL_DIV", "symbols": ["NUM", "_", {"literal":"("}, "_", "EXP", "_", {"literal":")"}], "postprocess": function(d) {return ast.Multiplication([d[0], d[4]]);}},
    {"name": "MUL_DIV", "symbols": ["MUL_DIV", "_", "DIV", "_", "EXPONENTIATION"], "postprocess": function(d) {return ast.Division([d[0], d[4]]);}},
    {"name": "MUL_DIV", "symbols": ["EXPONENTIATION"], "postprocess": id},
    {"name": "EXPONENTIATION", "symbols": ["EXPONENTIATION", "_", "POW", "_", "PARENTHESIS"], "postprocess": function(d) {return ast.Exponentiation([d[0], d[4]]);}},
    {"name": "EXPONENTIATION", "symbols": ["PARENTHESIS"], "postprocess": id},
    {"name": "NEGATION", "symbols": ["SUB", "_", "EXP"], "postprocess": function(d) {return ast.Negation([d[2]]);}},
    {"name": "MODULO", "symbols": ["EXP", "_", "MOD", "_", "EXP"], "postprocess": function(d) {return ast.Modulo([d[0], d[4]]);}},
    {"name": "PARENTHESIS", "symbols": [{"literal":"("}, "_", "ATOMIC", "_", {"literal":")"}], "postprocess": function(d) {return d[2];}},
    {"name": "PARENTHESIS", "symbols": ["ATOMIC"], "postprocess": id},
    {"name": "ATOMIC", "symbols": ["MODULO"]},
    {"name": "ATOMIC", "symbols": ["NEGATION"]},
    {"name": "ATOMIC", "symbols": ["FUNCTION"]},
    {"name": "ATOMIC", "symbols": ["VAL"]},
    {"name": "FUNCTION", "symbols": ["FUNC", "_", {"literal":"("}, "_", "FUNCARGS", "_", {"literal":")"}], "postprocess": function(d) {return ast.Function([d[0]].concat(d[4]));}},
    {"name": "ARGUMENT", "symbols": ["_", "EXP", "_"], "postprocess": function(d) {return d[1];}},
    {"name": "FUNCARGS", "symbols": ["ARGUMENT"], "postprocess": function(d) {return [d[0]];}},
    {"name": "FUNCARGS", "symbols": ["FUNCARGS", "_", {"literal":","}, "_", "ARGUMENT"], "postprocess": function(d) {return d[0].concat(d[4]);}}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

},{"./ast.js":1}],5:[function(require,module,exports){
(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.nearley = factory();
    }
}(this, function() {

    function Rule(name, symbols, postprocess) {
        this.id = ++Rule.highestId;
        this.name = name;
        this.symbols = symbols;        // a list of literal | regex class | nonterminal
        this.postprocess = postprocess;
        return this;
    }
    Rule.highestId = 0;

    Rule.prototype.toString = function(withCursorAt) {
        function stringifySymbolSequence (e) {
            return e.literal ? JSON.stringify(e.literal) :
                   e.type ? '%' + e.type : e.toString();
        }
        var symbolSequence = (typeof withCursorAt === "undefined")
                             ? this.symbols.map(stringifySymbolSequence).join(' ')
                             : (   this.symbols.slice(0, withCursorAt).map(stringifySymbolSequence).join(' ')
                                 + " ● "
                                 + this.symbols.slice(withCursorAt).map(stringifySymbolSequence).join(' ')     );
        return this.name + " → " + symbolSequence;
    }


    // a State is a rule at a position from a given starting point in the input stream (reference)
    function State(rule, dot, reference, wantedBy) {
        this.rule = rule;
        this.dot = dot;
        this.reference = reference;
        this.data = [];
        this.wantedBy = wantedBy;
        this.isComplete = this.dot === rule.symbols.length;
    }

    State.prototype.toString = function() {
        return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
    };

    State.prototype.nextState = function(child) {
        var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
        state.left = this;
        state.right = child;
        if (state.isComplete) {
            state.data = state.build();
        }
        return state;
    };

    State.prototype.build = function() {
        var children = [];
        var node = this;
        do {
            children.push(node.right.data);
            node = node.left;
        } while (node.left);
        children.reverse();
        return children;
    };

    State.prototype.finish = function() {
        if (this.rule.postprocess) {
            this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
        }
    };


    function Column(grammar, index) {
        this.grammar = grammar;
        this.index = index;
        this.states = [];
        this.wants = {}; // states indexed by the non-terminal they expect
        this.scannable = []; // list of states that expect a token
        this.completed = {}; // states that are nullable
    }


    Column.prototype.process = function(nextColumn) {
        var states = this.states;
        var wants = this.wants;
        var completed = this.completed;

        for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
            var state = states[w];

            if (state.isComplete) {
                state.finish();
                if (state.data !== Parser.fail) {
                    // complete
                    var wantedBy = state.wantedBy;
                    for (var i = wantedBy.length; i--; ) { // this line is hot
                        var left = wantedBy[i];
                        this.complete(left, state);
                    }

                    // special-case nullables
                    if (state.reference === this.index) {
                        // make sure future predictors of this rule get completed.
                        var exp = state.rule.name;
                        (this.completed[exp] = this.completed[exp] || []).push(state);
                    }
                }

            } else {
                // queue scannable states
                var exp = state.rule.symbols[state.dot];
                if (typeof exp !== 'string') {
                    this.scannable.push(state);
                    continue;
                }

                // predict
                if (wants[exp]) {
                    wants[exp].push(state);

                    if (completed.hasOwnProperty(exp)) {
                        var nulls = completed[exp];
                        for (var i = 0; i < nulls.length; i++) {
                            var right = nulls[i];
                            this.complete(state, right);
                        }
                    }
                } else {
                    wants[exp] = [state];
                    this.predict(exp);
                }
            }
        }
    }

    Column.prototype.predict = function(exp) {
        var rules = this.grammar.byName[exp] || [];

        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            var wantedBy = this.wants[exp];
            var s = new State(r, 0, this.index, wantedBy);
            this.states.push(s);
        }
    }

    Column.prototype.complete = function(left, right) {
        var copy = left.nextState(right);
        this.states.push(copy);
    }


    function Grammar(rules, start) {
        this.rules = rules;
        this.start = start || this.rules[0].name;
        var byName = this.byName = {};
        this.rules.forEach(function(rule) {
            if (!byName.hasOwnProperty(rule.name)) {
                byName[rule.name] = [];
            }
            byName[rule.name].push(rule);
        });
    }

    // So we can allow passing (rules, start) directly to Parser for backwards compatibility
    Grammar.fromCompiled = function(rules, start) {
        var lexer = rules.Lexer;
        if (rules.ParserStart) {
          start = rules.ParserStart;
          rules = rules.ParserRules;
        }
        var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
        var g = new Grammar(rules, start);
        g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
        return g;
    }


    function StreamLexer() {
      this.reset("");
    }

    StreamLexer.prototype.reset = function(data, state) {
        this.buffer = data;
        this.index = 0;
        this.line = state ? state.line : 1;
        this.lastLineBreak = state ? -state.col : 0;
    }

    StreamLexer.prototype.next = function() {
        if (this.index < this.buffer.length) {
            var ch = this.buffer[this.index++];
            if (ch === '\n') {
              this.line += 1;
              this.lastLineBreak = this.index;
            }
            return {value: ch};
        }
    }

    StreamLexer.prototype.save = function() {
      return {
        line: this.line,
        col: this.index - this.lastLineBreak,
      }
    }

    StreamLexer.prototype.formatError = function(token, message) {
        // nb. this gets called after consuming the offending token,
        // so the culprit is index-1
        var buffer = this.buffer;
        if (typeof buffer === 'string') {
            var nextLineBreak = buffer.indexOf('\n', this.index);
            if (nextLineBreak === -1) nextLineBreak = buffer.length;
            var line = buffer.substring(this.lastLineBreak, nextLineBreak)
            var col = this.index - this.lastLineBreak;
            message += " at line " + this.line + " col " + col + ":\n\n";
            message += "  " + line + "\n"
            message += "  " + Array(col).join(" ") + "^"
            return message;
        } else {
            return message + " at index " + (this.index - 1);
        }
    }


    function Parser(rules, start, options) {
        if (rules instanceof Grammar) {
            var grammar = rules;
            var options = start;
        } else {
            var grammar = Grammar.fromCompiled(rules, start);
        }
        this.grammar = grammar;

        // Read options
        this.options = {
            keepHistory: false,
            lexer: grammar.lexer || new StreamLexer,
        };
        for (var key in (options || {})) {
            this.options[key] = options[key];
        }

        // Setup lexer
        this.lexer = this.options.lexer;
        this.lexerState = undefined;

        // Setup a table
        var column = new Column(grammar, 0);
        var table = this.table = [column];

        // I could be expecting anything.
        column.wants[grammar.start] = [];
        column.predict(grammar.start);
        // TODO what if start rule is nullable?
        column.process();
        this.current = 0; // token index
    }

    // create a reserved token for indicating a parse fail
    Parser.fail = {};

    Parser.prototype.feed = function(chunk) {
        var lexer = this.lexer;
        lexer.reset(chunk, this.lexerState);

        var token;
        while (token = lexer.next()) {
            // We add new states to table[current+1]
            var column = this.table[this.current];

            // GC unused states
            if (!this.options.keepHistory) {
                delete this.table[this.current - 1];
            }

            var n = this.current + 1;
            var nextColumn = new Column(this.grammar, n);
            this.table.push(nextColumn);

            // Advance all tokens that expect the symbol
            var literal = token.value;
            var value = lexer.constructor === StreamLexer ? token.value : token;
            var scannable = column.scannable;
            for (var w = scannable.length; w--; ) {
                var state = scannable[w];
                var expect = state.rule.symbols[state.dot];
                // Try to consume the token
                // either regex or literal
                if (expect.test ? expect.test(value) :
                    expect.type ? expect.type === token.type
                                : expect.literal === literal) {
                    // Add it
                    var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                    nextColumn.states.push(next);
                }
            }

            // Next, for each of the rules, we either
            // (a) complete it, and try to see if the reference row expected that
            //     rule
            // (b) predict the next nonterminal it expects by adding that
            //     nonterminal's start state
            // To prevent duplication, we also keep track of rules we have already
            // added

            nextColumn.process();

            // If needed, throw an error:
            if (nextColumn.states.length === 0) {
                // No states at all! This is not good.
                var message = this.lexer.formatError(token, "invalid syntax") + "\n";
                message += "Unexpected " + (token.type ? token.type + " token: " : "");
                message += JSON.stringify(token.value !== undefined ? token.value : token) + "\n";
                var err = new Error(message);
                err.offset = this.current;
                err.token = token;
                throw err;
            }

            // maybe save lexer state
            if (this.options.keepHistory) {
              column.lexerState = lexer.save()
            }

            this.current++;
        }
        if (column) {
          this.lexerState = lexer.save()
        }

        // Incrementally keep track of results
        this.results = this.finish();

        // Allow chaining, for whatever it's worth
        return this;
    };

    Parser.prototype.save = function() {
        var column = this.table[this.current];
        column.lexerState = this.lexerState;
        return column;
    };

    Parser.prototype.restore = function(column) {
        var index = column.index;
        this.current = index;
        this.table[index] = column;
        this.table.splice(index + 1);
        this.lexerState = column.lexerState;

        // Incrementally keep track of results
        this.results = this.finish();
    };

    // nb. deprecated: use save/restore instead!
    Parser.prototype.rewind = function(index) {
        if (!this.options.keepHistory) {
            throw new Error('set option `keepHistory` to enable rewinding')
        }
        // nb. recall column (table) indicies fall between token indicies.
        //        col 0   --   token 0   --   col 1
        this.restore(this.table[index]);
    };

    Parser.prototype.finish = function() {
        // Return the possible parsings
        var considerations = [];
        var start = this.grammar.start;
        var column = this.table[this.table.length - 1]
        column.states.forEach(function (t) {
            if (t.rule.name === start
                    && t.dot === t.rule.symbols.length
                    && t.reference === 0
                    && t.data !== Parser.fail) {
                considerations.push(t);
            }
        });
        return considerations.map(function(c) {return c.data; });
    };

    return {
        Parser: Parser,
        Grammar: Grammar,
        Rule: Rule,
    };

}));

},{}],6:[function(require,module,exports){

var nearley = require('nearley');
var grammar = require('./math');

function parse(str) {
  var parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
  var output = parser.feed(str).results;
  var ast = clean(output);
  // console.log(JSON.stringify(ast, null, 2));
  return ast;
}

function clean(ast) {
  if(!(ast.length && ast[0].length)) return null;
  function _clean(ast) {
    while(Array.isArray(ast)) ast = ast[0];
    if(typeof ast !== 'object') return ast;
    ast.nodes = ast.nodes.map(_clean);
    return ast;
  }
  return _clean(ast);
}

module.exports = parse;


},{"./math":4,"nearley":5}]},{},[3]);
