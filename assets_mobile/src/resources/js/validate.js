/**
 * Created by cooky on 2018/6/19.
 */
export default {
    trim (str) {
        if (!str) {
            return '';
        }
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    isPhone (phone, oldPhone) {
        if (!phone) {
            return false;
        }

        if (this.trim(phone) === this.trim(oldPhone)) {
            return true;
        }

        let regPhone = /^1(33|53|73|77|80|81|89|34|35|36|37|38|39|50|51|52|57|58|59|78|82|83|84|87|88|30|31|32|55|56|75|76|85|86|70|71|44|46|47)[0-9]{8}$/;
        if (!regPhone.test(this.trim(phone))) {
            return false;
        }

        return true;
    },
    checkLength (str, minLen, maxLen) {
        let strlen = this.trim(str).replace(/[\u0391-\uFFE5]/g, 'aa').length;
        if (strlen > maxLen || strlen < minLen) {
            return false;
        }
        return true;
    }
};
