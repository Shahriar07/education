/* The 3D hand in the 3D scene (2026-11-26). Meshes come from make_meshes.py (mesh_<pose>.js, HANDMESH[pose]).
   A hand is placed by coordinates, not drawn over the picture:
     { n: pose, at: [x, y, z]   world point (metres) where the pose's anchor goes,
       y: [..]  the direction the fingers point (the hand's +y),
       z: [..]  the direction the back of the hand faces (the hand's +z; made exactly perpendicular to y) }
   The hand's +x = y × z (from the thumb side towards the little finger). Sizes stay true: 1 mm in the mesh = 1 mm. */
const HANDS3D = (() => {
  const T = THREE, dec = (s, Type) => { const b = atob(s), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return new Type(u.buffer); };
  let mats = null; const pool = {}, geos = {};
  function materials() {
    return mats || (mats = {
      skin: new T.MeshPhysicalMaterial({ color: 0x9a6a50, roughness: 0.55, metalness: 0, sheen: 0.45, sheenColor: new T.Color(0xffb796), sheenRoughness: 0.6, vertexColors: true }),
      nail: new T.MeshStandardMaterial({ color: 0xd9a48c, roughness: 0.3 }),
      cloth: new T.MeshStandardMaterial({ color: 0x2a6f97, roughness: 0.9 }),
      cuff: new T.MeshStandardMaterial({ color: 0x215a7c, roughness: 0.9 }) });
  }
  function geometry(name, part) {
    const key = name + '/' + part; if (geos[key]) return geos[key];
    const d = HANDMESH[name].parts[part], g = new T.BufferGeometry();
    const p = dec(d.p, Int16Array), n = dec(d.n, Int8Array), pos = new Float32Array(p.length), nor = new Float32Array(n.length);
    for (let i = 0; i < p.length; i++) pos[i] = p[i] / 10; for (let i = 0; i < n.length; i++) nor[i] = n[i] / 127;
    g.setAttribute('position', new T.BufferAttribute(pos, 3)); g.setAttribute('normal', new T.BufferAttribute(nor, 3));
    if (d.c) { const c = dec(d.c, Uint8Array), col = new Float32Array(c.length); for (let i = 0; i < c.length; i++) col[i] = c[i] / 255; g.setAttribute('color', new T.BufferAttribute(col, 3)); }
    g.setIndex(new T.BufferAttribute(dec(d.i, Uint32Array), 1));
    return geos[key] = g;
  }
  function make(scene, name) {
    const G = new T.Group(), M = materials(); G.scale.setScalar(0.001);
    for (const part of Object.keys(HANDMESH[name].parts)) { const m = new T.Mesh(geometry(name, part), M[part]); m.castShadow = true; m.receiveShadow = true; G.add(m); }
    scene.add(G); return G;
  }
  /* hide every hand, then place the ones asked for */
  function place(scene, list) {
    for (const k in pool) pool[k].forEach(g => g.visible = false);
    const used = {};
    (list || []).forEach(h => {
      const i = used[h.n] = (used[h.n] || 0) + 1, arr = pool[h.n] || (pool[h.n] = []);
      while (arr.length < i) arr.push(make(scene, h.n));
      const G = arr[i - 1]; G.visible = true;
      if (h.rod) {
        /* a grip on a rod: the rod's line in the hand (HANDMESH.axis) goes along h.rod, the back of the hand towards h.back */
        const a = new T.Vector3(...HANDMESH[h.n].axis).normalize(), b = new T.Vector3(0, 0, 1).sub(a.clone().multiplyScalar(a.z)).normalize(), c = a.clone().cross(b);
        const A = new T.Vector3(...h.rod).normalize(), B0 = new T.Vector3(...h.back), B = B0.sub(A.clone().multiplyScalar(B0.dot(A))).normalize(), C = A.clone().cross(B);
        const Mw = new T.Matrix4().makeBasis(A, B, C), Mh = new T.Matrix4().makeBasis(a, b, c);
        G.quaternion.setFromRotationMatrix(Mw.multiply(Mh.transpose()));
      } else {
        const Y = new T.Vector3(...h.y).normalize(), Z0 = new T.Vector3(...h.z), Z = Z0.sub(Y.clone().multiplyScalar(Z0.dot(Y))).normalize(), X = Y.clone().cross(Z);
        G.quaternion.setFromRotationMatrix(new T.Matrix4().makeBasis(X, Y, Z));
      }
      const a = new T.Vector3(...HANDMESH[h.n].anchor).multiplyScalar(0.001).applyQuaternion(G.quaternion);
      G.position.set(h.at[0] - a.x, h.at[1] - a.y, h.at[2] - a.z);
      /* mirrorZ: reflect the placed right hand in the plane z = mirrorZ, which makes it a left hand on the other side
         (three.js turns the faces round by itself for a mirrored matrix) */
      if (h.mirrorZ !== undefined) { G.updateMatrix(); G.matrixAutoUpdate = false;
        G.matrix.premultiply(new T.Matrix4().makeTranslation(0, 0, h.mirrorZ).multiply(new T.Matrix4().makeScale(1, 1, -1)).multiply(new T.Matrix4().makeTranslation(0, 0, -h.mirrorZ))); }
      else G.matrixAutoUpdate = true;
    });
  }
  return { place };
})();
