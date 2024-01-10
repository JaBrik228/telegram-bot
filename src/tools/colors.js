import { tg } from "./tg";

export const colors = {
    textColor: tg?.text_color ? tg.text_color : "#000",
    hintColor: tg?.hint_color ? tg.hint_color : "#A1AAB3",
    buttonColor: tg?.button_color ? tg.button_color : "#517DA2",
    buttonTextColor: tg?.button_text_color ? tg.button_text_color : "#fff",
    bgColor: tg?.bg_color ? tg.bg_color : "#fff",
    headerBgColor: tg?.header_bg_color ? tg.header_bg_color : '#517DA2'
};