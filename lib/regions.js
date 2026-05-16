// Canonical region + status data for the habitat map and any future list/table view.

export const REGIONS = [
  { id: 'pnw',  lng: -122, lat: 47,  label: 'Cascadia Microfiber Range',       status: 'Collapsing', detail: 'Server-farm expansion has reduced known burrows by 72% since 2019.' },
  { id: 'sw',   lng: -110, lat: 33,  label: 'Sonoran Lint Basin',              status: 'Critical',   detail: 'Lithium-corridor construction fragments the last contiguous polyester habitat in the Southwest.' },
  { id: 'gulf', lng: -90,  lat: 30,  label: 'Gulf Coast Nesting Plains',       status: 'Endangered', detail: 'Alligator predation events have tripled since coastal development pushed displaced polyesters into wetlands.' },
  { id: 'app',  lng: -82,  lat: 36,  label: 'Appalachian Fluff Belt',          status: 'Threatened', detail: 'Acrylic-runoff from textile manufacturing contaminates 41% of remaining burrows.' },
  { id: 'ne',   lng: -71,  lat: 43,  label: 'New England Shedding Corridor',   status: 'Vulnerable', detail: 'Urban heat-island effect disrupts seasonal molting cycles in the Boston-to-Portland metroplex.' },
  { id: 'gl',   lng: -85,  lat: 45,  label: 'Great Lakes Polysynthia Reserve', status: 'Recovering', detail: 'Volunteer-protected. Population stabilized after 2023 data-center moratorium.' },
  { id: 'eu',   lng: 6,    lat: 50,  label: 'Western European Shedding Belt',  status: 'Vulnerable', detail: 'High-density fast-fashion logistics corridors disrupt traditional Rhine-basin burrows.' },
  { id: 'bg',   lng: 90,   lat: 24,  label: 'Bengal Fast-Fashion Outflow Zone',status: 'Critical',   detail: 'Industrial dye and microfiber effluent has rendered 64% of historical delta habitat uninhabitable.' },
  { id: 'jp',   lng: 138,  lat: 36,  label: 'Honshū Compact Burrow Network',   status: 'Threatened', detail: 'Surviving as fragmented urban refugia. Acoustic pollution from data infrastructure is rising sharply.' },
  { id: 'au',   lng: 145,  lat: -34, label: 'Murray-Darling Lint Catchment',   status: 'Endangered', detail: 'Prolonged drought has collapsed substrate moisture below the threshold required for tuftling survival.' },
];

export const STATUS_COLOR = {
  Collapsing: '#7a1c16',
  Critical:   '#b3261e',
  Endangered: '#d98a82',
  Threatened: '#d6a85a',
  Vulnerable: '#a8c0cb',
  Recovering: '#7a9a6b',
};
