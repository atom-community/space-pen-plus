import {View, $} from "../dist/space-pen.js"

class BenchmarkView extends View {
  static content(index) {
    this.div(() => {
      this.div(`parent${index}`);
      this.ul(() => {
        this.li(`child${index}`);
      });
    });
  }
}

const parent = $('#container');
const startTime = Date.now();
for (let i = 1; i <= 1000; i++) { parent.append(new BenchmarkView(i)); }
parent.prepend(`Time to create 1,000 views: ${Date.now() - startTime}ms`);
