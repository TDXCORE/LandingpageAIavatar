import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Datos de países con códigos de llamada internacional
const countryData = [
  { code: "AD", name: "Andorra", dialCode: "+376", flag: "🇦🇩" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { code: "AF", name: "Afghanistan", dialCode: "+93", flag: "🇦🇫" },
  { code: "AG", name: "Antigua and Barbuda", dialCode: "+1268", flag: "🇦🇬" },
  { code: "AI", name: "Anguilla", dialCode: "+1264", flag: "🇦🇮" },
  { code: "AL", name: "Albania", dialCode: "+355", flag: "🇦🇱" },
  { code: "AM", name: "Armenia", dialCode: "+374", flag: "🇦🇲" },
  { code: "AO", name: "Angola", dialCode: "+244", flag: "🇦🇴" },
  { code: "AQ", name: "Antarctica", dialCode: "+672", flag: "🇦🇶" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "AS", name: "American Samoa", dialCode: "+1684", flag: "🇦🇸" },
  { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "AW", name: "Aruba", dialCode: "+297", flag: "🇦🇼" },
  { code: "AX", name: "Aland Islands", dialCode: "+358", flag: "🇦🇽" },
  { code: "AZ", name: "Azerbaijan", dialCode: "+994", flag: "🇦🇿" },
  { code: "BA", name: "Bosnia and Herzegovina", dialCode: "+387", flag: "🇧🇦" },
  { code: "BB", name: "Barbados", dialCode: "+1246", flag: "🇧🇧" },
  { code: "BD", name: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { code: "BF", name: "Burkina Faso", dialCode: "+226", flag: "🇧🇫" },
  { code: "BG", name: "Bulgaria", dialCode: "+359", flag: "🇧🇬" },
  { code: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { code: "BI", name: "Burundi", dialCode: "+257", flag: "🇧🇮" },
  { code: "BJ", name: "Benin", dialCode: "+229", flag: "🇧🇯" },
  { code: "BL", name: "Saint Barthelemy", dialCode: "+590", flag: "🇧🇱" },
  { code: "BM", name: "Bermuda", dialCode: "+1441", flag: "🇧🇲" },
  { code: "BN", name: "Brunei", dialCode: "+673", flag: "🇧🇳" },
  { code: "BO", name: "Bolivia", dialCode: "+591", flag: "🇧🇴" },
  { code: "BQ", name: "Bonaire, Sint Eustatius and Saba", dialCode: "+599", flag: "🇧🇶" },
  { code: "BR", name: "Brasil", dialCode: "+55", flag: "🇧🇷" },
  { code: "BS", name: "Bahamas", dialCode: "+1242", flag: "🇧🇸" },
  { code: "BT", name: "Bhutan", dialCode: "+975", flag: "🇧🇹" },
  { code: "BV", name: "Bouvet Island", dialCode: "+47", flag: "🇧🇻" },
  { code: "BW", name: "Botswana", dialCode: "+267", flag: "🇧🇼" },
  { code: "BY", name: "Belarus", dialCode: "+375", flag: "🇧🇾" },
  { code: "BZ", name: "Belize", dialCode: "+501", flag: "🇧🇿" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "CC", name: "Cocos Islands", dialCode: "+61", flag: "🇨🇨" },
  { code: "CD", name: "Democratic Republic of the Congo", dialCode: "+243", flag: "🇨🇩" },
  { code: "CF", name: "Central African Republic", dialCode: "+236", flag: "🇨🇫" },
  { code: "CG", name: "Republic of the Congo", dialCode: "+242", flag: "🇨🇬" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { code: "CI", name: "Ivory Coast", dialCode: "+225", flag: "🇨🇮" },
  { code: "CK", name: "Cook Islands", dialCode: "+682", flag: "🇨🇰" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "CM", name: "Cameroon", dialCode: "+237", flag: "🇨🇲" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "CR", name: "Costa Rica", dialCode: "+506", flag: "🇨🇷" },
  { code: "CU", name: "Cuba", dialCode: "+53", flag: "🇨🇺" },
  { code: "CV", name: "Cape Verde", dialCode: "+238", flag: "🇨🇻" },
  { code: "CW", name: "Curacao", dialCode: "+599", flag: "🇨🇼" },
  { code: "CX", name: "Christmas Island", dialCode: "+61", flag: "🇨🇽" },
  { code: "CY", name: "Cyprus", dialCode: "+357", flag: "🇨🇾" },
  { code: "CZ", name: "Czech Republic", dialCode: "+420", flag: "🇨🇿" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "DJ", name: "Djibouti", dialCode: "+253", flag: "🇩🇯" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { code: "DM", name: "Dominica", dialCode: "+1767", flag: "🇩🇲" },
  { code: "DO", name: "Dominican Republic", dialCode: "+1809", flag: "🇩🇴" },
  { code: "DZ", name: "Algeria", dialCode: "+213", flag: "🇩🇿" },
  { code: "EC", name: "Ecuador", dialCode: "+593", flag: "🇪🇨" },
  { code: "EE", name: "Estonia", dialCode: "+372", flag: "🇪🇪" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { code: "EH", name: "Western Sahara", dialCode: "+212", flag: "🇪🇭" },
  { code: "ER", name: "Eritrea", dialCode: "+291", flag: "🇪🇷" },
  { code: "ES", name: "España", dialCode: "+34", flag: "🇪🇸" },
  { code: "ET", name: "Ethiopia", dialCode: "+251", flag: "🇪🇹" },
  { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮" },
  { code: "FJ", name: "Fiji", dialCode: "+679", flag: "🇫🇯" },
  { code: "FK", name: "Falkland Islands", dialCode: "+500", flag: "🇫🇰" },
  { code: "FM", name: "Micronesia", dialCode: "+691", flag: "🇫🇲" },
  { code: "FO", name: "Faroe Islands", dialCode: "+298", flag: "🇫🇴" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "GA", name: "Gabon", dialCode: "+241", flag: "🇬🇦" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "GD", name: "Grenada", dialCode: "+1473", flag: "🇬🇩" },
  { code: "GE", name: "Georgia", dialCode: "+995", flag: "🇬🇪" },
  { code: "GF", name: "French Guiana", dialCode: "+594", flag: "🇬🇫" },
  { code: "GG", name: "Guernsey", dialCode: "+44", flag: "🇬🇬" },
  { code: "GH", name: "Ghana", dialCode: "+233", flag: "🇬🇭" },
  { code: "GI", name: "Gibraltar", dialCode: "+350", flag: "🇬🇮" },
  { code: "GL", name: "Greenland", dialCode: "+299", flag: "🇬🇱" },
  { code: "GM", name: "Gambia", dialCode: "+220", flag: "🇬🇲" },
  { code: "GN", name: "Guinea", dialCode: "+224", flag: "🇬🇳" },
  { code: "GP", name: "Guadeloupe", dialCode: "+590", flag: "🇬🇵" },
  { code: "GQ", name: "Equatorial Guinea", dialCode: "+240", flag: "🇬🇶" },
  { code: "GR", name: "Greece", dialCode: "+30", flag: "🇬🇷" },
  { code: "GS", name: "South Georgia and the South Sandwich Islands", dialCode: "+500", flag: "🇬🇸" },
  { code: "GT", name: "Guatemala", dialCode: "+502", flag: "🇬🇹" },
  { code: "GU", name: "Guam", dialCode: "+1671", flag: "🇬🇺" },
  { code: "GW", name: "Guinea-Bissau", dialCode: "+245", flag: "🇬🇼" },
  { code: "GY", name: "Guyana", dialCode: "+592", flag: "🇬🇾" },
  { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰" },
  { code: "HM", name: "Heard Island and McDonald Islands", dialCode: "+672", flag: "🇭🇲" },
  { code: "HN", name: "Honduras", dialCode: "+504", flag: "🇭🇳" },
  { code: "HR", name: "Croatia", dialCode: "+385", flag: "🇭🇷" },
  { code: "HT", name: "Haiti", dialCode: "+509", flag: "🇭🇹" },
  { code: "HU", name: "Hungary", dialCode: "+36", flag: "🇭🇺" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
  { code: "IL", name: "Israel", dialCode: "+972", flag: "🇮🇱" },
  { code: "IM", name: "Isle of Man", dialCode: "+44", flag: "🇮🇲" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "IO", name: "British Indian Ocean Territory", dialCode: "+246", flag: "🇮🇴" },
  { code: "IQ", name: "Iraq", dialCode: "+964", flag: "🇮🇶" },
  { code: "IR", name: "Iran", dialCode: "+98", flag: "🇮🇷" },
  { code: "IS", name: "Iceland", dialCode: "+354", flag: "🇮🇸" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "JE", name: "Jersey", dialCode: "+44", flag: "🇯🇪" },
  { code: "JM", name: "Jamaica", dialCode: "+1876", flag: "🇯🇲" },
  { code: "JO", name: "Jordan", dialCode: "+962", flag: "🇯🇴" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { code: "KG", name: "Kyrgyzstan", dialCode: "+996", flag: "🇰🇬" },
  { code: "KH", name: "Cambodia", dialCode: "+855", flag: "🇰🇭" },
  { code: "KI", name: "Kiribati", dialCode: "+686", flag: "🇰🇮" },
  { code: "KM", name: "Comoros", dialCode: "+269", flag: "🇰🇲" },
  { code: "KN", name: "Saint Kitts and Nevis", dialCode: "+1869", flag: "🇰🇳" },
  { code: "KP", name: "North Korea", dialCode: "+850", flag: "🇰🇵" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "KW", name: "Kuwait", dialCode: "+965", flag: "🇰🇼" },
  { code: "KY", name: "Cayman Islands", dialCode: "+1345", flag: "🇰🇾" },
  { code: "KZ", name: "Kazakhstan", dialCode: "+7", flag: "🇰🇿" },
  { code: "LA", name: "Laos", dialCode: "+856", flag: "🇱🇦" },
  { code: "LB", name: "Lebanon", dialCode: "+961", flag: "🇱🇧" },
  { code: "LC", name: "Saint Lucia", dialCode: "+1758", flag: "🇱🇨" },
  { code: "LI", name: "Liechtenstein", dialCode: "+423", flag: "🇱🇮" },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰" },
  { code: "LR", name: "Liberia", dialCode: "+231", flag: "🇱🇷" },
  { code: "LS", name: "Lesotho", dialCode: "+266", flag: "🇱🇸" },
  { code: "LT", name: "Lithuania", dialCode: "+370", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", dialCode: "+352", flag: "🇱🇺" },
  { code: "LV", name: "Latvia", dialCode: "+371", flag: "🇱🇻" },
  { code: "LY", name: "Libya", dialCode: "+218", flag: "🇱🇾" },
  { code: "MA", name: "Morocco", dialCode: "+212", flag: "🇲🇦" },
  { code: "MC", name: "Monaco", dialCode: "+377", flag: "🇲🇨" },
  { code: "MD", name: "Moldova", dialCode: "+373", flag: "🇲🇩" },
  { code: "ME", name: "Montenegro", dialCode: "+382", flag: "🇲🇪" },
  { code: "MF", name: "Saint Martin", dialCode: "+590", flag: "🇲🇫" },
  { code: "MG", name: "Madagascar", dialCode: "+261", flag: "🇲🇬" },
  { code: "MH", name: "Marshall Islands", dialCode: "+692", flag: "🇲🇭" },
  { code: "MK", name: "Macedonia", dialCode: "+389", flag: "🇲🇰" },
  { code: "ML", name: "Mali", dialCode: "+223", flag: "🇲🇱" },
  { code: "MM", name: "Myanmar", dialCode: "+95", flag: "🇲🇲" },
  { code: "MN", name: "Mongolia", dialCode: "+976", flag: "🇲🇳" },
  { code: "MO", name: "Macao", dialCode: "+853", flag: "🇲🇴" },
  { code: "MP", name: "Northern Mariana Islands", dialCode: "+1670", flag: "🇲🇵" },
  { code: "MQ", name: "Martinique", dialCode: "+596", flag: "🇲🇶" },
  { code: "MR", name: "Mauritania", dialCode: "+222", flag: "🇲🇷" },
  { code: "MS", name: "Montserrat", dialCode: "+1664", flag: "🇲🇸" },
  { code: "MT", name: "Malta", dialCode: "+356", flag: "🇲🇹" },
  { code: "MU", name: "Mauritius", dialCode: "+230", flag: "🇲🇺" },
  { code: "MV", name: "Maldives", dialCode: "+960", flag: "🇲🇻" },
  { code: "MW", name: "Malawi", dialCode: "+265", flag: "🇲🇼" },
  { code: "MX", name: "México", dialCode: "+52", flag: "🇲🇽" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "MZ", name: "Mozambique", dialCode: "+258", flag: "🇲🇿" },
  { code: "NA", name: "Namibia", dialCode: "+264", flag: "🇳🇦" },
  { code: "NC", name: "New Caledonia", dialCode: "+687", flag: "🇳🇨" },
  { code: "NE", name: "Niger", dialCode: "+227", flag: "🇳🇪" },
  { code: "NF", name: "Norfolk Island", dialCode: "+672", flag: "🇳🇫" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { code: "NI", name: "Nicaragua", dialCode: "+505", flag: "🇳🇮" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { code: "NP", name: "Nepal", dialCode: "+977", flag: "🇳🇵" },
  { code: "NR", name: "Nauru", dialCode: "+674", flag: "🇳🇷" },
  { code: "NU", name: "Niue", dialCode: "+683", flag: "🇳🇺" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
  { code: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲" },
  { code: "PA", name: "Panama", dialCode: "+507", flag: "🇵🇦" },
  { code: "PE", name: "Perú", dialCode: "+51", flag: "🇵🇪" },
  { code: "PF", name: "French Polynesia", dialCode: "+689", flag: "🇵🇫" },
  { code: "PG", name: "Papua New Guinea", dialCode: "+675", flag: "🇵🇬" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
  { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
  { code: "PM", name: "Saint Pierre and Miquelon", dialCode: "+508", flag: "🇵🇲" },
  { code: "PN", name: "Pitcairn", dialCode: "+64", flag: "🇵🇳" },
  { code: "PR", name: "Puerto Rico", dialCode: "+1787", flag: "🇵🇷" },
  { code: "PS", name: "Palestinian Territory", dialCode: "+970", flag: "🇵🇸" },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { code: "PW", name: "Palau", dialCode: "+680", flag: "🇵🇼" },
  { code: "PY", name: "Paraguay", dialCode: "+595", flag: "🇵🇾" },
  { code: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦" },
  { code: "RE", name: "Reunion", dialCode: "+262", flag: "🇷🇪" },
  { code: "RO", name: "Romania", dialCode: "+40", flag: "🇷🇴" },
  { code: "RS", name: "Serbia", dialCode: "+381", flag: "🇷🇸" },
  { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" },
  { code: "RW", name: "Rwanda", dialCode: "+250", flag: "🇷🇼" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "SB", name: "Solomon Islands", dialCode: "+677", flag: "🇸🇧" },
  { code: "SC", name: "Seychelles", dialCode: "+248", flag: "🇸🇨" },
  { code: "SD", name: "Sudan", dialCode: "+249", flag: "🇸🇩" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "SH", name: "Saint Helena", dialCode: "+290", flag: "🇸🇭" },
  { code: "SI", name: "Slovenia", dialCode: "+386", flag: "🇸🇮" },
  { code: "SJ", name: "Svalbard and Jan Mayen", dialCode: "+47", flag: "🇸🇯" },
  { code: "SK", name: "Slovakia", dialCode: "+421", flag: "🇸🇰" },
  { code: "SL", name: "Sierra Leone", dialCode: "+232", flag: "🇸🇱" },
  { code: "SM", name: "San Marino", dialCode: "+378", flag: "🇸🇲" },
  { code: "SN", name: "Senegal", dialCode: "+221", flag: "🇸🇳" },
  { code: "SO", name: "Somalia", dialCode: "+252", flag: "🇸🇴" },
  { code: "SR", name: "Suriname", dialCode: "+597", flag: "🇸🇷" },
  { code: "SS", name: "South Sudan", dialCode: "+211", flag: "🇸🇸" },
  { code: "ST", name: "Sao Tome and Principe", dialCode: "+239", flag: "🇸🇹" },
  { code: "SV", name: "El Salvador", dialCode: "+503", flag: "🇸🇻" },
  { code: "SX", name: "Sint Maarten", dialCode: "+1721", flag: "🇸🇽" },
  { code: "SY", name: "Syria", dialCode: "+963", flag: "🇸🇾" },
  { code: "SZ", name: "Swaziland", dialCode: "+268", flag: "🇸🇿" },
  { code: "TC", name: "Turks and Caicos Islands", dialCode: "+1649", flag: "🇹🇨" },
  { code: "TD", name: "Chad", dialCode: "+235", flag: "🇹🇩" },
  { code: "TF", name: "French Southern Territories", dialCode: "+262", flag: "🇹🇫" },
  { code: "TG", name: "Togo", dialCode: "+228", flag: "🇹🇬" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { code: "TJ", name: "Tajikistan", dialCode: "+992", flag: "🇹🇯" },
  { code: "TK", name: "Tokelau", dialCode: "+690", flag: "🇹🇰" },
  { code: "TL", name: "Timor-Leste", dialCode: "+670", flag: "🇹🇱" },
  { code: "TM", name: "Turkmenistan", dialCode: "+993", flag: "🇹🇲" },
  { code: "TN", name: "Tunisia", dialCode: "+216", flag: "🇹🇳" },
  { code: "TO", name: "Tonga", dialCode: "+676", flag: "🇹🇴" },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { code: "TT", name: "Trinidad and Tobago", dialCode: "+1868", flag: "🇹🇹" },
  { code: "TV", name: "Tuvalu", dialCode: "+688", flag: "🇹🇻" },
  { code: "TW", name: "Taiwan", dialCode: "+886", flag: "🇹🇼" },
  { code: "TZ", name: "Tanzania", dialCode: "+255", flag: "🇹🇿" },
  { code: "UA", name: "Ukraine", dialCode: "+380", flag: "🇺🇦" },
  { code: "UG", name: "Uganda", dialCode: "+256", flag: "🇺🇬" },
  { code: "UM", name: "United States Minor Outlying Islands", dialCode: "+1", flag: "🇺🇲" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", dialCode: "+598", flag: "🇺🇾" },
  { code: "UZ", name: "Uzbekistan", dialCode: "+998", flag: "🇺🇿" },
  { code: "VA", name: "Vatican", dialCode: "+39", flag: "🇻🇦" },
  { code: "VC", name: "Saint Vincent and the Grenadines", dialCode: "+1784", flag: "🇻🇨" },
  { code: "VE", name: "Venezuela", dialCode: "+58", flag: "🇻🇪" },
  { code: "VG", name: "British Virgin Islands", dialCode: "+1284", flag: "🇻🇬" },
  { code: "VI", name: "U.S. Virgin Islands", dialCode: "+1340", flag: "🇻🇮" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
  { code: "VU", name: "Vanuatu", dialCode: "+678", flag: "🇻🇺" },
  { code: "WF", name: "Wallis and Futuna", dialCode: "+681", flag: "🇼🇫" },
  { code: "WS", name: "Samoa", dialCode: "+685", flag: "🇼🇸" },
  { code: "YE", name: "Yemen", dialCode: "+967", flag: "🇾🇪" },
  { code: "YT", name: "Mayotte", dialCode: "+262", flag: "🇾🇹" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { code: "ZM", name: "Zambia", dialCode: "+260", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", dialCode: "+263", flag: "🇿🇼" }
];

interface CustomPhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  id?: string;
  name?: string;
}

export const CustomPhoneInput = ({
  value = "+57",
  onChange,
  onBlur,
  placeholder = "Ingresa tu número de teléfono",
  className = "",
  autoFocus = false,
  onKeyDown,
  id,
  name
}: CustomPhoneInputProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Find current country based on value
  const currentCountry = useMemo(() => {
    const country = countryData.find(c => value.startsWith(c.dialCode));
    return country || countryData.find(c => c.code === "CO")!;
  }, [value]);

  // Extract phone number without country code
  const phoneNumber = useMemo(() => {
    return value.replace(currentCountry.dialCode, "");
  }, [value, currentCountry]);

  // Filter countries based on search term
  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countryData;
    
    const search = searchTerm.toLowerCase();
    return countryData.filter(country => 
      country.name.toLowerCase().includes(search) ||
      country.dialCode.includes(search) ||
      country.code.toLowerCase().includes(search)
    );
  }, [searchTerm]);

  const handleCountrySelect = (country: typeof countryData[0]) => {
    const newValue = country.dialCode + phoneNumber;
    onChange?.(newValue);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    const newValue = currentCountry.dialCode + newNumber;
    onChange?.(newValue);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex">
        {/* Country selector */}
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-12 px-3 rounded-r-none border-r-0 bg-input border-border/50 focus:border-primary/50 hover:bg-input/80"
          >
            <span className="text-lg mr-2">{currentCountry.flag}</span>
            <span className="text-sm">{currentCountry.dialCode}</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
          
          {/* Dropdown */}
          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 z-20 w-80 mt-1 bg-background border border-border rounded-lg shadow-lg max-h-96 overflow-hidden">
                {/* Search */}
                <div className="p-3 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Buscar país o código..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-9"
                    />
                  </div>
                </div>
                
                {/* Countries list */}
                <div className="max-h-64 overflow-y-auto">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full px-4 py-2 text-left hover:bg-muted/50 flex items-center gap-3 text-sm"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span className="flex-1">{country.name}</span>
                      <span className="text-muted-foreground">{country.dialCode}</span>
                    </button>
                  ))}
                  
                  {filteredCountries.length === 0 && (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      No se encontraron países
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Phone number input */}
        <Input
          id={id}
          name={name}
          type="tel"
          value={phoneNumber}
          onChange={handleNumberChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="h-12 rounded-l-none bg-input border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all flex-1"
          autoFocus={autoFocus}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};