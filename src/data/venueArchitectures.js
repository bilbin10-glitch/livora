// Livora Venue Architecture & 1,000+ Capacity Matrix

export const VENUE_LAYOUT_TYPES = {
  AMPHITHEATRE: 'amphitheatre', // Curved radial crescent layout
  INDOOR_ARENA: 'indoor_arena', // Massive multi-block U-shaped arena superdome
  THEATRE: 'theatre_auditorium', // Proscenium stage with Orchestra stalls, Royal boxes & Upper Balcony
  CLUB_LOUNGE: 'comedy_club' // Cabaret table clusters & ringside seating
};

// Map each event venue to its architectural layout and 1000+ capacity specification
export function getVenueArchitecture(event) {
  const vName = (event.venue || '').toLowerCase();
  const category = event.category;

  if (vName.includes('bolgatty') || vName.includes('amphitheatre') || vName.includes('beach') || vName.includes('nishagandhi') || vName.includes('lawn')) {
    return {
      type: VENUE_LAYOUT_TYPES.AMPHITHEATRE,
      typeName: 'Waterfront / Open-Air Amphitheatre',
      totalCapacity: 3500,
      layoutShape: 'curved-radial',
      stageAlignment: 'semi-circular',
      blocks: [
        { id: 'blk_fanpit', name: 'Waterfront Fan Pit (Zone A)', capacity: 500, tierId: 'tier_vip', tierName: 'VIP Waterfront Pit', price: event.ticketTiers[0]?.price || 2999, color: '#f59e0b', rows: ['PIT-1', 'PIT-2', 'PIT-3', 'PIT-4'], colsPerRow: 14 },
        { id: 'blk_gold_crescent', name: 'Golden Crescent Tier (Zone B)', capacity: 900, tierId: 'tier_gold', tierName: 'Gold Crescent Stalls', price: event.ticketTiers[1]?.price || 1799, color: '#e11d48', rows: ['ARC-A', 'ARC-B', 'ARC-C', 'ARC-D', 'ARC-E'], colsPerRow: 18 },
        { id: 'blk_silver_steps', name: 'Silver Stepped Amphitheatre (Zone C)', capacity: 1100, tierId: 'tier_silver', tierName: 'Silver Stepped Deck', price: event.ticketTiers[2]?.price || 1299, color: '#06b6d4', rows: ['STP-1', 'STP-2', 'STP-3', 'STP-4', 'STP-5'], colsPerRow: 20 },
        { id: 'blk_lawn', name: 'General Promenade Lawn (Zone D)', capacity: 1000, tierId: 'tier_bronze', tierName: 'Open Lawn Pass', price: event.ticketTiers[3]?.price || 899, color: '#8b5cf6', rows: ['LWN-A', 'LWN-B', 'LWN-C', 'LWN-D'], colsPerRow: 22 }
      ]
    };
  }

  if (vName.includes('arena') || vName.includes('stadium') || vName.includes('superdome') || category === 'music_concert') {
    return {
      type: VENUE_LAYOUT_TYPES.INDOOR_ARENA,
      typeName: 'Multi-Tier Indoor Superdome Arena',
      totalCapacity: 4800,
      layoutShape: 'arena-bowl',
      stageAlignment: 'thrust-stage',
      blocks: [
        { id: 'blk_arena_floor', name: 'Stage Front Mosh Deck (Floor VIP)', capacity: 600, tierId: 'tier_vip', tierName: 'Floor VIP Moshpit', price: event.ticketTiers[0]?.price || 2999, color: '#f59e0b', rows: ['VIP-1', 'VIP-2', 'VIP-3', 'VIP-4'], colsPerRow: 16 },
        { id: 'blk_lower_bowl', name: 'Lower Bowl Centered Stalls (Block 101-104)', capacity: 1400, tierId: 'tier_gold', tierName: 'Lower Bowl Gold', price: event.ticketTiers[1]?.price || 1899, color: '#e11d48', rows: ['BOWL-A', 'BOWL-B', 'BOWL-C', 'BOWL-D', 'BOWL-E'], colsPerRow: 20 },
        { id: 'blk_mid_wing', name: 'Mid Concourse Wings (Left & Right)', capacity: 1300, tierId: 'tier_silver', tierName: 'Silver Concourse', price: event.ticketTiers[2]?.price || 1299, color: '#06b6d4', rows: ['WING-1', 'WING-2', 'WING-3', 'WING-4', 'WING-5'], colsPerRow: 20 },
        { id: 'blk_upper_deck', name: 'Upper Arena Grandstand (Block 201-208)', capacity: 1500, tierId: 'tier_bronze', tierName: 'Upper Grandstand', price: event.ticketTiers[3]?.price || 899, color: '#8b5cf6', rows: ['UPP-A', 'UPP-B', 'UPP-C', 'UPP-D'], colsPerRow: 24 }
      ]
    };
  }

  if (vName.includes('ncpa') || vName.includes('theatre') || vName.includes('hall') || vName.includes('auditorium') || vName.includes('jtpac') || vName.includes('opera')) {
    return {
      type: VENUE_LAYOUT_TYPES.THEATRE,
      typeName: 'Grand Proscenium Concert Theatre',
      totalCapacity: 1850,
      layoutShape: 'proscenium-theatre',
      stageAlignment: 'proscenium',
      blocks: [
        { id: 'blk_royal_boxes', name: 'Royal Box Suites & VIP Stalls', capacity: 250, tierId: 'tier_vip', tierName: 'Royal Box VIP', price: event.ticketTiers[0]?.price || 2499, color: '#f59e0b', rows: ['ROYAL-A', 'ROYAL-B', 'ROYAL-C'], colsPerRow: 14 },
        { id: 'blk_orchestra_stalls', name: 'Orchestra Center Stalls (Rows D-J)', capacity: 650, tierId: 'tier_gold', tierName: 'Orchestra Gold', price: event.ticketTiers[1]?.price || 1599, color: '#e11d48', rows: ['ORCH-D', 'ORCH-E', 'ORCH-F', 'ORCH-G', 'ORCH-H'], colsPerRow: 18 },
        { id: 'blk_dress_circle', name: 'Grand Dress Circle Mezzanine', capacity: 450, tierId: 'tier_silver', tierName: 'Dress Circle Silver', price: event.ticketTiers[2]?.price || 1099, color: '#06b6d4', rows: ['CIRC-1', 'CIRC-2', 'CIRC-3', 'CIRC-4'], colsPerRow: 18 },
        { id: 'blk_upper_balcony', name: 'Royal Upper Balcony Tier', capacity: 500, tierId: 'tier_bronze', tierName: 'Upper Balcony', price: event.ticketTiers[3]?.price || 699, color: '#8b5cf6', rows: ['BALC-A', 'BALC-B', 'BALC-C', 'BALC-D'], colsPerRow: 20 }
      ]
    };
  }

  // Default Club / Comedy Lounge (1,100 capacity)
  return {
    type: VENUE_LAYOUT_TYPES.CLUB_LOUNGE,
    typeName: 'Club & Live Comedy Lounge Arena',
    totalCapacity: 1200,
    layoutShape: 'cabaret-lounge',
    stageAlignment: 'intimate-podium',
    blocks: [
      { id: 'blk_front_roast', name: 'Front Row Roast Tables (VIP)', capacity: 200, tierId: 'tier_vip', tierName: 'VIP Ringside Table', price: event.ticketTiers[0]?.price || 1899, color: '#f59e0b', rows: ['TABLE-A', 'TABLE-B', 'TABLE-C'], colsPerRow: 12 },
      { id: 'blk_main_club', name: 'Center Lounge Stalls (Gold)', capacity: 400, tierId: 'tier_gold', tierName: 'Main Lounge Gold', price: event.ticketTiers[1]?.price || 1299, color: '#e11d48', rows: ['CLUB-D', 'CLUB-E', 'CLUB-F', 'CLUB-G'], colsPerRow: 16 },
      { id: 'blk_bar_deck', name: 'Bar Deck & High Tops (Silver)', capacity: 300, tierId: 'tier_silver', tierName: 'Silver Bar Deck', price: event.ticketTiers[2]?.price || 899, color: '#06b6d4', rows: ['BAR-1', 'BAR-2', 'BAR-3'], colsPerRow: 16 },
      { id: 'blk_rear_lounge', name: 'General Upper Lounge (Bronze)', capacity: 300, tierId: 'tier_bronze', tierName: 'General Lounge', price: event.ticketTiers[3]?.price || 599, color: '#8b5cf6', rows: ['LNG-A', 'LNG-B', 'LNG-C'], colsPerRow: 18 }
    ]
  };
}
