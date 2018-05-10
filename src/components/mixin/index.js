import goGroup from './util';

export default {
  props: {
    keyName: [String || Array],
  },
  created() {
    this.init();
    this.group = goGroup(this.$parent);
  },
  methods: {
    init() {
      this.value = this.params[this.keyName];
      if (typeof this.keyName !== 'string') {
        // return;
      }
      // this.keyName.forEach((index) => {
      //   console.log(index);
      //   this.value = this.params[this.keyName[index]];
      // });
    },
    submit() {
      this.group.$emit('pre-submit');
    },
  },
};
