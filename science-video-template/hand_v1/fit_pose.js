/* The pose fitted to the reference photo (make_hand.py fit); loaded after pose.js and overrides it. */
Object.assign(POSE, {"size": 0.8, "wrist": {"ext": -24.3, "dev": -11.7}, "index": {"abd": -11.4, "flex": [44.5, 55.7, -25]}, "middle": {"abd": 11, "flex": [52.3, 47.5, 16.6]}, "ring": {"abd": -13, "flex": [86.8, 36.6, 2.9]}, "little": {"abd": -23.6, "flex": [100, 25.8, 0]}, "thumb": {"dir": [-0.266, 0.7597, -0.5934], "up": [-0.9438, -0.3305, 0], "flex": [16.1, -12.1]}});
Object.assign(POSE.pen, {"tip": [-20.3, 97.6, -75.3], "web": [-20.1, 53, 9.2]});
VIEWS.photo = { from: HAND.V(...[-0.7927, -0.3776, 0.4786]), up: HAND.V(...[0.4321, 0.2058, 0.878]), target: HAND.V(-10, -250, -20), span: 800 };
VIEWS.side = VIEWS.photo;
