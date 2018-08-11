var maskStartRegExp = /^([^#ANX]+)/;
/**
 * Simple format function borrowed from PureMask.js
 * {@link https://github.com/romulobrasil/PureMask.js}
 *
 * @param {String} str String to mask (input value)
 * @param {String} [mask] Mask format, like `####-##`
 * @returns {string} Formatted text
 */
function format(str, mask) {
  let data = str;
  // don't do anything if mask is undefined/null/etc
  if (mask === null || mask === undefined || typeof mask !== 'string') {
    return data;
  }

  if (data.length === 1 && maskStartRegExp.test(mask)) {
    data = maskStartRegExp.exec(mask)[0] + data;
  }

  var text = '';

  // Adds a char offset to allow testing on optional values
  var cOffset = 0;

  // Cleans data to  avoid value loss on dynamic mask changing
  for (var i = 0; i < mask.length; i++) {
    var m = mask.charAt(i);
    switch (m) {
      case '#': break;
      case 'A': break;
      case '?': break;
      case 'N': break;
      case 'X': break;
      default: data = data.replace(m, '');
    }
  }

  for (var i = 0, x = 1; x && i < mask.length; ++i) {
    var c = data.charAt(i - cOffset);
    var m = mask.charAt(i);

    switch (m) {
      case '#': if (/\d/.test(c)) { text += c; } else { x = 0; } break;
      case 'A': if (/[a-z]/i.test(c)) { text += c; } else { x = 0; } break;
      case 'N': if (/[a-z0-9]/i.test(c)) { text += c; } else { x = 0; } break;
      case '?': cOffset++; break;
      case 'X': text += c; break;
      default:
        text += m;
        if (c && c !== m) {
          data = ' ' + data;
        }
        break;
    }
  }
  return text;
}

function generateCNPJ() {
  var base = '';
  // 10 242 235 0001
  for(var i = 0; i < 12; i++) {
    if (i >= 8 && i < 11) {
      base += '0';
    } else if (i === 11) {
      base += '1';
    } else {
      base += (Math.random() * 9) >> 0;
    }
  }

  var cnpj = genCNPJVerifier(base);
  console.log('CNPJ Gerado: ' + cnpj);

  document.getElementById('maskedCNPJ').innerHTML = 'CNPJ com Mascara: ' + format(cnpj, '##.###.###/####-##');
  document.getElementById('unmaskedCNPJ').innerHTML = 'CNPJ sem Mascara: ' + cnpj;
}

function genCNPJVerifier(base) {
  var c = 5, s = 0;
  for (var i = 0; i < base.length; i++) {
    s += parseInt(base[i], 10) * c;
    c--;
    c = c < 2 ? 9 : c;
  }

  t0 = s % 11 < 2 ? 0 : 11 - (s % 11);

  c = 6
  s = 0
  base += t0.toString();
  for (var i = 0; i < base.length; i++) {
    s += parseInt(base[i], 10) * c;
    c--;
    c = c < 2 ? 9 : c;
  }

  t1 = s % 11 < 2 ? 0 : 11 - (s % 11)
  base += t1.toString()

  return base;
}