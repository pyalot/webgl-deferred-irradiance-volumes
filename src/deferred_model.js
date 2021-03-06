// Generated by CoffeeScript 1.3.3
var DeferredModel, Sphere,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Sphere = require('/webgl/sphere');

return DeferredModel = (function(_super) {

  __extends(DeferredModel, _super);

  DeferredModel.prototype.attribs = ['position', 'lightprobe', 'center'];

  DeferredModel.prototype.pointers = [
    {
      name: 'position',
      size: 3,
      offset: 0,
      stride: 7
    }, {
      name: 'lightprobe',
      size: 4,
      offset: 3,
      stride: 7
    }
  ];

  function DeferredModel(gl, probes) {
    var buffer, i, probe, px, py, pz, template, vi, x, y, z, _i, _j, _len, _ref;
    this.gl = gl;
    DeferredModel.__super__.constructor.call(this);
    template = Sphere.makeVertices(5.1, 2);
    buffer = [];
    for (i = _i = 0, _len = probes.length; _i < _len; i = ++_i) {
      probe = probes[i];
      px = probe.x;
      py = probe.y;
      pz = probe.z;
      for (vi = _j = 0, _ref = template.length; _j < _ref; vi = _j += 3) {
        x = template[vi];
        y = template[vi + 1];
        z = template[vi + 2];
        buffer.push(x, y, z, px, py, pz, i);
      }
    }
    this.size = buffer.length / 7;
    this.uploadList(buffer);
  }

  return DeferredModel;

})(require('webgl/drawable'));
