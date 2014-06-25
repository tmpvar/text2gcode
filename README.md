# text2gcode

This is an executable module that turns text + (ttf|otf) fonts into gcode

## install

```npm install -g text2gcode```

## usage

```
node ./text2gcode.js --font=/path/to/text.ttf --diameter=2.5 --depth=-5 "hello world"

Options:
  --font      /path/to/font.ttf                                     [required]
  --depth     total depth to go (may be negative)                   [required]
  --diameter  cutting tool diameter                                 [required]
  --fs        size of the font in world units (mm/in)               [default: 20]
  --pass      total depth taken off per layer (depth per pass)      [default: 0.1]
  --rotate    rotate by % TAU (i.e. --rotate=.25 means 90 degrees)  [default: 0]
  --mirror    mirror on the x axis                                  [default: false]
  -x          translate on the x                                    [default: 0]
  -y          translate on the y                                    [default: 0]

```

And here's how you can generate the gcode for cutting out the [npmjs](http://npmjs.org) logo:

_note_: you'll probably get better results if you use a smaller tool, but that's all I had on hand!

```
text2gcode --font=GUBBLO___.ttf "npm" --fs=100 --diameter=6.35 --pass=1
```

Which means, cut out the text "npm" (where each uppercase letter is 100mm) using a tool that is 6.35mm in diameter.
`--pass` ensures that there will be 5 passes total (1mm per pass!)

The result looks something like this:

![npmjs logo in pine](http://i.imgur.com/xPdmg3R.png)


## Shouts

This project would not be possible if the following projects did not exist:

 * [gcanvas](https://github.com/em/gcanvas)
 * [opentype.js](https://github.com/nodebox/opentype.js)

## License

MIT
