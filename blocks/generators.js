Blockly.Python['iled_show_number'] = function (block) {
  Blockly.Python.definitions_['import_iLED4'] = 'import iLED4';

  var value_number = Blockly.Python.valueToCode(block, 'number', Blockly.Python.ORDER_ATOMIC) || '0';
  var number_decimal = block.getFieldValue('decimal');

  var code = `iLED4.printFloat(${value_number}, ${number_decimal}, 10)\n`;
  return code;
};

Blockly.Python['iled_show_digit_at'] = function (block) {
  Blockly.Python.definitions_['import_iLED4'] = 'import iLED4';

  var value_number = Blockly.Python.valueToCode(block, 'number', Blockly.Python.ORDER_ATOMIC) || '0';
  var value_pos = Blockly.Python.valueToCode(block, 'pos', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = `iLED4.writeDigitNum(${value_pos}, ${value_number}, False)\n`;
  return code;
};

Blockly.Python['iled_show_char_at'] = function (block) {
  Blockly.Python.definitions_['import_iLED4'] = 'import iLED4';

  var dropdown_char = block.getFieldValue('char');
  var value_pos = Blockly.Python.valueToCode(block, 'pos', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = `iLED4.writeDigitNum(${value_pos}, ${dropdown_char}, False)\n`;
  return code;
};

Blockly.Python['iled_show_hex_number'] = function (block) {
  Blockly.Python.definitions_['import_iLED4'] = 'import iLED4';

  var value_number = Blockly.Python.valueToCode(block, 'number', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = `iLED4.printFloat(int(${value_number}), 0, 16)\n`;
  return code;
};

Blockly.Python['iled_turn_on'] = function (block) {
  Blockly.Python.definitions_['import_iLED4'] = 'import iLED4';

  var code = `iLED4.turn_on()\n`;
  return code;
};

Blockly.Python['iled_turn_off'] = function (block) {
  Blockly.Python.definitions_['import_iLED4'] = 'import iLED4';

  var code = `iLED4.turn_off()\n`;
  return code;
};

Blockly.Python['iled_clear'] = function (block) {
  Blockly.Python.definitions_['import_iLED4'] = 'import iLED4';

  var code = `iLED4.clear()\n`;
  return code;
};

Blockly.Python['iled_set_dotpoint'] = function (block) {
  Blockly.Python.definitions_['import_iLED4'] = 'import iLED4';

  var value_pos = Blockly.Python.valueToCode(block, 'pos', Blockly.Python.ORDER_ATOMIC) || '0';
  var dropdown_show = block.getFieldValue('show');

  var code = `iLED4.showDotPoint(${value_pos}, ${dropdown_show})\n`;
  return code;
};

Blockly.Python['iled_set_colon'] = function (block) {
  Blockly.Python.definitions_['import_iLED4'] = 'import iLED4';

  var dropdown_show = block.getFieldValue('show');

  var code = `iLED4.drawColon(${dropdown_show})\n`;
  return code;
};

Blockly.Python['iled_set_intensity'] = function (block) {
  Blockly.Python.definitions_['import_iLED4'] = 'import iLED4';

  var value_intensity = Blockly.Python.valueToCode(block, 'intensity', Blockly.Python.ORDER_ATOMIC) || '15';

  var code = `iLED4.setBrightness(${value_intensity})\n`;
  return code;
};
