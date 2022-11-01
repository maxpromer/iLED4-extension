({
    name: "iLED4", // Category Name
    description: "4-digit LED display I2C interface",
    author: "INEX",
    category: "Display",
    version: "1.1.0",
    icon: "/static/icon.png", // Category icon
    color: "#3498DB", // Category color (recommend some blocks color)
    blocks: [ // Blocks in Category
        {
            xml: `
                <block type="iled_show_number">
                    <value name="number">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="iled_show_digit_at">
                    <value name="number">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                    <value name="pos">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="iled_show_char_at">
                    <value name="pos">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        {
            xml: `
                <block type="iled_show_hex_number">
                    <value name="number">
                        <shadow type="math_number">
                            <field name="NUM">255</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        "iled_turn_on",
        "iled_turn_off",
        "iled_clear",
        {
            xml: `
                <block type="iled_set_dotpoint">
                    <value name="pos">
                        <shadow type="math_number">
                            <field name="NUM">0</field>
                        </shadow>
                    </value>
                </block>
            `
        },
        "iled_set_colon",
        {
            xml: `
                <block type="iled_set_intensity">
                    <value name="intensity">
                        <shadow type="math_number">
                            <field name="NUM">15</field>
                        </shadow>
                    </value>
                </block>
            `
        }
    ]
});
