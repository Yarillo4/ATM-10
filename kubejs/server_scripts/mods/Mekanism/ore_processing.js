// This File has been authored by AllTheMods Staff, or a Community contributor for use in AllTheMods - AllTheMods 10.
// As all AllTheMods packs are licensed under All Rights Reserved, this file is not allowed to be used in any public packs not released by the AllTheMods Team, without explicit permission.


ServerEvents.recipes(allthemods => {

    const overwrite = [
        'tin',
        'lead',
        'uranium',
        'osmium',
    ]

    overwrite.forEach(material => {
        allthemods.remove({id: `mekanism:processing/${material}/slurry/dirty/from_raw_block`})
        allthemods.remove({id: `mekanism:processing/${material}/slurry/dirty/from_raw_ore`})
        allthemods.remove({id: `mekanism:processing/${material}/slurry/dirty/from_ore`})
        
        dissolution(`c:storage_blocks/raw_${material}`, `alltheores:dirty_${material}`, 6000, `mekanism:processing/${material}/slurry/dirty/from_raw_block`)
        dissolution(`c:raw_materials/${material}`, `alltheores:dirty_${material}`, 2000, `mekanism:processing/${material}/slurry/dirty/from_raw_ore`)
        dissolution(`c:ores/${material}`, `alltheores:dirty_${material}`, 1000, `mekanism:processing/${material}/slurry/dirty/from_ore`)

        allthemods.remove({id: `mekanism:processing/${material}/crystal/from_slurry`})
        allthemods.remove({id: `mekanism:processing/${material}/shard/from_crystal`})
        allthemods.remove({id: `mekanism:processing/${material}/dirty_dust/from_clump`})
        allthemods.remove({id: `mekanism:processing/${material}/dust/from_dirty_dust`})
    })

    const id = {
        alltheores: [
            'aluminum',
            'nickel',
            'platinum',
            'silver',
            'iridium',
            'zinc',
            'tin',
            'lead',
            'uranium',
            'osmium',
        ],
        allthemodium: [
            'allthemodium',
            'vibranium',
            'unobtainium'
        ],
        mekanism: [
            'iron',
            'gold',
            'copper'
        ]
    };

    Object.entries(id).forEach(([mod, materials]) => {
        materials.forEach(material => {

            if (mod === 'mekanism') {
                washing(`mekanism:dirty_${material}`, `mekanism:clean_${material}`, `mekanism:processing/${material}/slurry/clean`);
                injecting(`c:crystals/${material}`, `mekanism:shard_${material}`, `mekanism:processing/${material}/shard/from_crystal`);
                crushing(`c:clumps/${material}`, `mekanism:dirty_dust_${material}`, `mekanism:processing/${material}/dirty_dust/from_clump`);
                enriching(`c:dirty_dusts/${material}`, `alltheores:${material}_dust`, `mekanism:processing/${material}/dust/from_dirty_dust`);
            }
            if (mod === 'allthemodium') {
                washing(`allthemodium:dirty_${material}`, `allthemodium:clean_${material}`, `allthemodium:processing/${material}/slurry/clean`);
                injecting(`c:crystals/${material}`, `allthemodium:${material}_shard`, `allthemodium:processing/${material}/shard/from_crystal`);
                crushing(`c:clumps/${material}`, `allthemodium:dirty_${material}_dust`, `allthemodium:processing/${material}/dirty_dust/from_clump`);
                enriching(`c:dirty_dusts/${material}`, `allthemodium:${material}_dust`, `allthemodium:processing/${material}/dust/from_dirty_dust`);
            }
            if (mod === 'alltheores') {
                washing(`alltheores:dirty_${material}`, `alltheores:clean_${material}`, `alltheores:processing/${material}/slurry/from_dirty`);
                injecting(`c:crystals/${material}`, `alltheores:${material}_shard`, `alltheores:processing/${material}/shard/from_crystal`);
                crushing(`c:clumps/${material}`, `alltheores:dirty_${material}_dust`, `alltheores:processing/${material}/dirty_dust/from_clumpy`);
                enriching(`c:dirty_dusts/${material}`, `alltheores:${material}_dust`, `alltheores:processing/${material}/dust/from_dirty_dust`);
            }
        });
    });

    function dissolution(input, output, amount, id) {
        allthemods.custom(
            {
                "type": "mekanism:dissolution",
                "chemical_input": {
                    "amount": 1,
                    "chemical": "mekanism:sulfuric_acid"
                },
                "item_input": {
                    "count": 1,
                    "tag": input
                },
                "output": {
                    "amount": amount,
                    "id": output
                },
                "per_tick_usage": true
            }
        ).id(id)
    }

    function washing(input, output, id) {
        allthemods.custom(
            {
                "type": "mekanism:washing",
                "fluid_input": {
                    "amount": 25,
                    "tag": "minecraft:water"
                },
                "chemical_input": {
                    "amount": 5,
                    "chemical": input
                },
                "output": {
                    "amount": 3,
                    "id": output
                },
            }
        ).id(id)
    }

    function injecting(input, output, id) {
        allthemods.custom(
            {
                "type": "mekanism:injecting",
                "item_input": {
                    "count": 1,
                    "tag": input
                },
                "chemical_input": {
                    "amount": 1,
                    "chemical": "mekanism:hydrogen_chloride"
                },
                "output": {
                    "count": 2,
                    "id": output
                },
                "per_tick_usage": true
            }
        ).id(id)
    }

    function crushing(input, output, id) {
        allthemods.custom(
            {
                "type": "mekanism:crushing",
                "input": {
                    "count": 1,
                    "tag": input
                },
                "output": {
                    "count": 2,
                    "id": output
                }
            }
        ).id(id)
    }

    function enriching(input, output, id) {
        allthemods.custom(
            {
                "type": "mekanism:enriching",
                "input": {
                    "count": 4,
                    "tag": input
                },
                "output": {
                    "count": 3,
                    "id": output
                }
            }
        ).id(id)
    }

})

// This File has been authored by AllTheMods Staff, or a Community contributor for use in AllTheMods - AllTheMods 10.
// As all AllTheMods packs are licensed under All Rights Reserved, this file is not allowed to be used in any public packs not released by the AllTheMods Team, without explicit permission.
