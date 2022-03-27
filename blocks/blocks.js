// en.js
Blockly.Msg.ILED_SHOW_NUMBER_MESSAGE = "iLED4 show number %1 decimal places %2";
Blockly.Msg.ILED_SHOW_NUMBER_TOOLTIP = "";

Blockly.Msg.ILED_SHOW_DIGIT_AT_MESSAGE = "iLED4 show digit %1 at %2";
Blockly.Msg.ILED_SHOW_DIGIT_AT_TOOLTIP = "";

Blockly.Msg.ILED_SHOW_CHAR_AT_MESSAGE = "iLED4 show character %1 at %2"
Blockly.Msg.ILED_SHOW_CHAR_AT_TOOLTIP = "";

Blockly.Msg.ILED_SHOW_HEX_NUMBER_MESSAGE = "iLED4 show hex number %1";
Blockly.Msg.ILED_SHOW_HEX_NUMBER_TOOLTIP = "";

Blockly.Msg.ILED_TURN_ON_MESSAGE = "iLED4 turn on";
Blockly.Msg.ILED_TURN_ON_TOOLTIP = "";

Blockly.Msg.ILED_TURN_OFF_MESSAGE = "iLED4 turn off";
Blockly.Msg.ILED_TURN_OFF_TOOLTIP = "";

Blockly.Msg.ILED_CLEAR_MESSAGE = "iLED4 clear";
Blockly.Msg.ILED_CLEAR_TOOLTIP = "";

Blockly.Msg.ILED_SET_DOTPOINT_MESSAGE = "iLED4 Dotpoint at %1 show %2";
Blockly.Msg.ILED_SET_DOTPOINT_TOOLTIP = "";

Blockly.Msg.ILED_SET_DOTPOINT_TRUE_MESSAGE = "true";
Blockly.Msg.ILED_SET_DOTPOINT_FALSE_MESSAGE = "false";

Blockly.Msg.ILED_SET_COLON_MESSAGE = "iLED4 colon show %1";
Blockly.Msg.ILED_SET_COLON_TOOLTIP = "";

Blockly.Msg.ILED_SET_INTENSITY_MESSAGE = "iLED4 set intensity %1";
Blockly.Msg.ILED_SET_INTENSITY_TOOLTIP = "Set intensity (0-15)";

// ------------
Blockly.defineBlocksWithJsonArray([
  {
    "type": "iled_show_number",
    "message0": Blockly.Msg.ILED_SHOW_NUMBER_MESSAGE,
    "args0": [
      {
        "type": "input_value",
        "name": "number",
        "check": "Number"
      },
      {
        "type": "field_number",
        "name": "decimal",
        "value": 2,
        "min": 0,
        "max": 3
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#2ECC71",
    "tooltip": Blockly.Msg.ILED_SHOW_NUMBER_TOOLTIP,
    "helpUrl": ""
  },
  {
    "type": "iled_show_digit_at",
    "message0": Blockly.Msg.ILED_SHOW_DIGIT_AT_MESSAGE,
    "args0": [
      {
        "type": "input_value",
        "name": "number",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "pos",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#2ECC71",
    "tooltip": Blockly.Msg.ILED_SHOW_DIGIT_AT_TOOLTIP,
    "helpUrl": ""
  },
  {
    "type": "iled_show_char_at",
    "message0": Blockly.Msg.ILED_SHOW_CHAR_AT_MESSAGE,
    "args0": [
      {
        "type": "field_dropdown",
        "name": "char",
        "options": [
          [
            "0",
            "0"
          ],
          [
            "1",
            "1"
          ],
          [
            "2",
            "2"
          ],
          [
            "3",
            "3"
          ],
          [
            "4",
            "4"
          ],
          [
            "5",
            "5"
          ],
          [
            "6",
            "6"
          ],
          [
            "7",
            "7"
          ],
          [
            "8",
            "9"
          ],
          [
            "9",
            "9"
          ],
          [
            "a",
            "10"
          ],
          [
            "b",
            "11"
          ],
          [
            "C",
            "12"
          ],
          [
            "d",
            "13"
          ],
          [
            "E",
            "14"
          ],
          [
            "F",
            "15"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "pos",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#2ECC71",
    "tooltip": Blockly.Msg.ILED_SHOW_CHAR_AT_TOOLTIP,
    "helpUrl": ""
  },
  {
    "type": "iled_show_hex_number",
    "message0": Blockly.Msg.ILED_SHOW_HEX_NUMBER_MESSAGE,
    "args0": [
      {
        "type": "input_value",
        "name": "number",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#2ECC71",
    "tooltip": Blockly.Msg.ILED_SHOW_HEX_NUMBER_TOOLTIP,
    "helpUrl": ""
  },
  {
    "type": "iled_turn_on",
    "message0": Blockly.Msg.ILED_TURN_ON_MESSAGE,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#2ECC71",
    "tooltip": Blockly.Msg.ILED_TURN_ON_TOOLTIP,
    "helpUrl": ""
  },
  {
    "type": "iled_turn_off",
    "message0": Blockly.Msg.ILED_TURN_OFF_MESSAGE,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#2ECC71",
    "tooltip": Blockly.Msg.ILED_TURN_OFF_TOOLTIP,
    "helpUrl": ""
  },
  {
    "type": "iled_clear",
    "message0": Blockly.Msg.ILED_CLEAR_MESSAGE,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#2ECC71",
    "tooltip": Blockly.Msg.ILED_CLEAR_TOOLTIP,
    "helpUrl": ""
  },
  {
    "type": "iled_set_dotpoint",
    "message0": Blockly.Msg.ILED_SET_DOTPOINT_MESSAGE,
    "args0": [
      {
        "type": "input_value",
        "name": "pos",
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "show",
        "options": [
          [
            Blockly.Msg.ILED_SET_DOTPOINT_TRUE_MESSAGE,
            "true"
          ],
          [
            Blockly.Msg.ILED_SET_DOTPOINT_FALSE_MESSAGE,
            "false"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#2ECC71",
    "tooltip": Blockly.Msg.ILED_SET_DOTPOINT_TOOLTIP,
    "helpUrl": ""
  },
  {
    "type": "iled_set_colon",
    "message0": Blockly.Msg.ILED_SET_COLON_MESSAGE,
    "args0": [
      {
        "type": "field_dropdown",
        "name": "show",
        "options": [
          [
            Blockly.Msg.ILED_SET_DOTPOINT_TRUE_MESSAGE,
            "true"
          ],
          [
            Blockly.Msg.ILED_SET_DOTPOINT_FALSE_MESSAGE,
            "false"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#2ECC71",
    "tooltip": Blockly.Msg.ILED_SET_COLON_TOOLTIP,
    "helpUrl": ""
  },
  {
    "type": "iled_set_intensity",
    "message0": Blockly.Msg.ILED_SET_INTENSITY_MESSAGE,
    "args0": [
      {
        "type": "input_value",
        "name": "intensity",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#2ECC71",
    "tooltip": Blockly.Msg.ILED_SET_INTENSITY_TOOLTIP,
    "helpUrl": ""
  }
]);
