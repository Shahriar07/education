/* The pose fitted to the reference photo (make_hand.py fit); loaded after pose.js and overrides it. */
Object.assign(POSE, {"size": 0.813, "shape": {"len": 1.014, "wid": 1.111, "palmW": 0.996, "tWid": 0.963, "rlLen": 1.134, "web": 1.07, "palmT": 0.988}, "arm": {"w": 1.093, "flat": 0.759, "taper": 1.059}, "wrist": {"ext": -32.2, "dev": -13.2}, "index": {"abd": -12.5, "flex": [44.4, 53, -25]}, "middle": {"abd": 2.9, "flex": [54.9, 59.1, -10]}, "ring": {"abd": -15.8, "flex": [77.4, 41.1, 7.5]}, "little": {"abd": -25, "flex": [96.3, 20.3, 0.1]}, "thumb": {"dir": [-0.271, 0.7612, -0.5892], "up": [-0.9421, -0.3355, 0], "flex": [16.3, -12.1]}});
Object.assign(POSE.pen, {"tip": [-20, 97.6, -75], "web": [-19.3, 52.1, 9.9]});
VIEWS.photo = { from: HAND.V(...[-0.7306, -0.348, 0.5875]), up: HAND.V(...[0.5304, 0.2526, 0.8093]), target: HAND.V(-10, -250, -20), span: 800 };
VIEWS.side = VIEWS.photo;
