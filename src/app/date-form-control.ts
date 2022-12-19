import { FormControl } from '@angular/forms';

export class DateFormControl extends FormControl {
  setValue(value: string | null, options: any) {
    console.log('value: >>', value);
    if (!value) {
      super.setValue('', { ...options, emitModelToViewChange: true });
      return;
    }

    // user無法輸入文字（只要匹配到不是'數字'或'/'，就無法輸入，就會用 this.value 替代 value）
    if (value.match(/[^0-9|\/]/gi)) {
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }
    //讓 user 無法輸入超過 5 個字元
    if (value.length > 5) {
      console.log('this.value :>> ', this.value);
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }
    // 讓 user 可以去除斜線
    if (value.length === 2 && this.value.length === 3) {
      super.setValue(value, {
        ...options,
        emitModelToViewChange: true,
      });
      return;
    }
    // user 輸入兩個字元後，自動加入斜線
    if (value.length === 2) {
      super.setValue(value + '/', {
        ...options,
        emitModelToViewChange: true,
      });
      return;
    }
    super.setValue(value, { ...options, emitModelToViewChange: true });
  }
}
