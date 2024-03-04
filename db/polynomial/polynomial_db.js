
///////////////////////////////////////////////////////////////////////////////
//
// Database Constructor
//

function Create_PolynomialDatabase(polynomials)
{
  var db = {};

  db.degree = (function extract_polys_by_degree() {
    var degree = []

    for (i = 0 ; i <= 64 ; i++) {
      degree[i] = null;
    }

    for (poly of polynomials) {
      if (degree[poly.id.degree] === null) {
        degree[poly.id.degree] = [ poly ];
      } else {
        degree[poly.id.degree].push(poly);
      }
    }

    return degree;
  })();

  db.HD = (function extract_polys_by_hd() {
    var HD = []

    for (i = 0 ; i <= 32 ; i++) {
      HD[i] = null;
    }

    for (poly of polynomials) {

      for (i = 3 ; i < poly.hd.length ; i++) {
        if (HD[i] === null) {
          HD[i] = [ poly ];
        } else {
          HD[i].push(poly);
        }
      }

    }

    return HD;
  })();

  db.find = function(constraints) {

    if (constraints === null || constraints === undefined || constraints.HD === undefined) {
      constraints = {'HD' : 3, 'len_bytes' : 0, 'degree' : 64}
    }

    if (constraints.len_bytes === undefined) {
      constraints.len_bytes = 0
    }

    if (constraints.degree === undefined) {
      constraints.degree = 64
    }

    var candidates_min_hd = db['HD'][constraints.HD];

    if (candidates_min_hd === undefined || candidates_min_hd === null || candidates_min_hd.length === 0) {
      return null;
    }

    var candidates_min_len_bytes = [];

    for (candidate of candidates_min_hd) {

      if (candidate.hd[constraints.HD].bytes < constraints.len_bytes) {
        continue;
      }

      candidates_min_len_bytes.push(candidate);

    }

    if (candidates_min_len_bytes.length === 0) {
      return null;
    }

    var candidates_final = [];

    var degree_ok;

    if (Array.isArray(constraints.degree)) {
      degree_ok = function(candidate) {
        return constraints.degree.indexOf(candidate.id.degree) !== -1;
      };
    } else {
      degree_ok = function(candidate) {
        return candidate.id.degree <= constraints.degree;
      };
    }

    for (candidate of candidates_min_len_bytes) {

      if (!degree_ok(candidate)) {
        continue;
      }

      candidates_final.push(candidate);

    }

    if (candidates_final.length === 0) {
      return null;
    }

    candidates_final.sort(function predicate(a, b){
      if (a.id.degree != b.id.degree) {
        return a.id.degree - b.id.degree
      }

      var max_common_hd = (a.hd.length < b.hd.length ? a.hd.length : b.hd.length) - 1;

      for (i = constraints.HD ; i <= max_common_hd ; i++) {
        if (a.hd[i].bits == b.hd[i].bits) {
          continue;
        }

        return b.hd[i].bits - a.hd[i].bits;
      }

      return b.hd.length - a.hd.length;
    });

    return candidates_final;
  }

  return db;
}

var polynomials = Create_PolynomialDatabase( [ 
{
  "id" : {
    "polynomial" : "x^3 + 1",
    "degree"     : 3,
    "explicit"   : "0x9",
    "koopman"    : "0x4",
    "normal"     : "0x1"
  },
  "hd" :     [null, null, null
  ],
}
,{
  "id" : {
    "polynomial" : "x^3 + x^1 + 1",
    "degree"     : 3,
    "explicit"   : "0xb",
    "koopman"    : "0x5",
    "normal"     : "0x3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^4 + x^1 + 1",
    "degree"     : 4,
    "explicit"   : "0x13",
    "koopman"    : "0x9",
    "normal"     : "0x3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 11, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^4 + x^2 + x^1 + 1",
    "degree"     : 4,
    "explicit"   : "0x17",
    "koopman"    : "0xB",
    "normal"     : "0x7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 3, "bytes"   : 0 },
    /* 4 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^4 + x^3 + x^2 + 1",
    "degree"     : 4,
    "explicit"   : "0x1d",
    "koopman"    : "0xE",
    "normal"     : "0xd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 3, "bytes"   : 0 },
    /* 4 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 4,
    "explicit"   : "0x1f",
    "koopman"    : "0xF",
    "normal"     : "0xf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1, "bytes"   : 0 },
    /* 4 */ { "bits"    : 1, "bytes"   : 0 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^5 + x^2 + 1",
    "degree"     : 5,
    "explicit"   : "0x25",
    "koopman"    : "0x12",
    "normal"     : "0x5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 26, "bytes"   : 3 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^5 + x^3 + x^1 + 1",
    "degree"     : 5,
    "explicit"   : "0x2b",
    "koopman"    : "0x15",
    "normal"     : "0xb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 10, "bytes"   : 1 },
    /* 4 */ { "bits"    : 10, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 5,
    "explicit"   : "0x3d",
    "koopman"    : "0x1E",
    "normal"     : "0x1d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 26, "bytes"   : 3 },
    /* 4 */ { "bits"    : 3, "bytes"   : 0 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^6 + x^1 + 1",
    "degree"     : 6,
    "explicit"   : "0x43",
    "koopman"    : "0x21",
    "normal"     : "0x3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 57, "bytes"   : 7 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^6 + x^2 + x^1 + 1",
    "degree"     : 6,
    "explicit"   : "0x47",
    "koopman"    : "0x23",
    "normal"     : "0x7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 25, "bytes"   : 3 },
    /* 4 */ { "bits"    : 25, "bytes"   : 3 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^6 + x^4 + x^3 + 1",
    "degree"     : 6,
    "explicit"   : "0x59",
    "koopman"    : "0x2C",
    "normal"     : "0x19"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 25, "bytes"   : 3 },
    /* 4 */ { "bits"    : 25, "bytes"   : 3 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^6 + x^4 + x^3 + x^2 + 1",
    "degree"     : 6,
    "explicit"   : "0x5d",
    "koopman"    : "0x2E",
    "normal"     : "0x1d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 9, "bytes"   : 1 },
    /* 4 */ { "bits"    : 9, "bytes"   : 1 },
    /* 5 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 6,
    "explicit"   : "0x67",
    "koopman"    : "0x33",
    "normal"     : "0x27"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 57, "bytes"   : 7 },
    /* 4 */ { "bits"    : 5, "bytes"   : 0 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 6,
    "explicit"   : "0x6f",
    "koopman"    : "0x37",
    "normal"     : "0x2f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 25, "bytes"   : 3 },
    /* 4 */ { "bits"    : 25, "bytes"   : 3 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^7 + x^1 + 1",
    "degree"     : 7,
    "explicit"   : "0x83",
    "koopman"    : "0x41",
    "normal"     : "0x3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 120, "bytes"   : 15 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^7 + x^3 + 1",
    "degree"     : 7,
    "explicit"   : "0x89",
    "koopman"    : "0x44",
    "normal"     : "0x9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 120, "bytes"   : 15 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^7 + x^4 + x^2 + 1",
    "degree"     : 7,
    "explicit"   : "0x95",
    "koopman"    : "0x4A",
    "normal"     : "0x15"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 56, "bytes"   : 7 },
    /* 4 */ { "bits"    : 56, "bytes"   : 7 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^7 + x^4 + x^3 + x^1 + 1",
    "degree"     : 7,
    "explicit"   : "0x9b",
    "koopman"    : "0x4D",
    "normal"     : "0x1b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 28, "bytes"   : 3 },
    /* 4 */ { "bits"    : 28, "bytes"   : 3 },
    /* 5 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^7 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 7,
    "explicit"   : "0xb7",
    "koopman"    : "0x5B",
    "normal"     : "0x37"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 56, "bytes"   : 7 },
    /* 4 */ { "bits"    : 56, "bytes"   : 7 },
    /* 5 */ { "bits"    : 2, "bytes"   : 0 },
    /* 6 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^7 + x^6 + x^2 + 1",
    "degree"     : 7,
    "explicit"   : "0xc5",
    "koopman"    : "0x62",
    "normal"     : "0x45"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 56, "bytes"   : 7 },
    /* 4 */ { "bits"    : 56, "bytes"   : 7 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^7 + x^6 + x^3 + x^1 + 1",
    "degree"     : 7,
    "explicit"   : "0xcb",
    "koopman"    : "0x65",
    "normal"     : "0x4b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 120, "bytes"   : 15 },
    /* 4 */ { "bits"    : 14, "bytes"   : 1 },
    /* 5 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^7 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 7,
    "explicit"   : "0xcf",
    "koopman"    : "0x67",
    "normal"     : "0x4f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 7, "bytes"   : 0 },
    /* 4 */ { "bits"    : 7, "bytes"   : 0 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^7 + x^6 + x^4 + 1",
    "degree"     : 7,
    "explicit"   : "0xd1",
    "koopman"    : "0x68",
    "normal"     : "0x51"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8, "bytes"   : 1 },
    /* 4 */ { "bits"    : 8, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^7 + x^6 + x^5 + x^2 + 1",
    "degree"     : 7,
    "explicit"   : "0xe5",
    "koopman"    : "0x72",
    "normal"     : "0x65"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 120, "bytes"   : 15 },
    /* 4 */ { "bits"    : 7, "bytes"   : 0 },
    /* 5 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^7 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 7,
    "explicit"   : "0xef",
    "koopman"    : "0x77",
    "normal"     : "0x6f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 120, "bytes"   : 15 },
    /* 4 */ { "bits"    : 12, "bytes"   : 1 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + 1",
    "degree"     : 8,
    "explicit"   : "0x101",
    "koopman"    : "0x80",
    "normal"     : "0x1"
  },
  "hd" :     [null, null, null
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^2 + x^1 + 1",
    "degree"     : 8,
    "explicit"   : "0x107",
    "koopman"    : "0x83",
    "normal"     : "0x7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 119, "bytes"   : 14 },
    /* 4 */ { "bits"    : 119, "bytes"   : 14 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^4 + x^3 + x^1 + 1",
    "degree"     : 8,
    "explicit"   : "0x11b",
    "koopman"    : "0x8D",
    "normal"     : "0x1b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 43, "bytes"   : 5 },
    /* 4 */ { "bits"    : 26, "bytes"   : 3 },
    /* 5 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^4 + x^3 + x^2 + 1",
    "degree"     : 8,
    "explicit"   : "0x11d",
    "koopman"    : "0x8E",
    "normal"     : "0x1d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 247, "bytes"   : 30 },
    /* 4 */ { "bits"    : 13, "bytes"   : 1 },
    /* 5 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 8,
    "explicit"   : "0x12f",
    "koopman"    : "0x97",
    "normal"     : "0x2f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 119, "bytes"   : 14 },
    /* 4 */ { "bits"    : 119, "bytes"   : 14 },
    /* 5 */ { "bits"    : 3, "bytes"   : 0 },
    /* 6 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^5 + x^4 + 1",
    "degree"     : 8,
    "explicit"   : "0x131",
    "koopman"    : "0x98",
    "normal"     : "0x31"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 119, "bytes"   : 14 },
    /* 4 */ { "bits"    : 119, "bytes"   : 14 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 8,
    "explicit"   : "0x137",
    "koopman"    : "0x9B",
    "normal"     : "0x37"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 118, "bytes"   : 14 },
    /* 4 */ { "bits"    : 118, "bytes"   : 14 },
    /* 5 */ { "bits"    : 4, "bytes"   : 0 },
    /* 6 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^5 + x^4 + x^3 + 1",
    "degree"     : 8,
    "explicit"   : "0x139",
    "koopman"    : "0x9C",
    "normal"     : "0x39"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 9, "bytes"   : 1 },
    /* 4 */ { "bits"    : 9, "bytes"   : 1 },
    /* 5 */ { "bits"    : 9, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^6 + x^3 + 1",
    "degree"     : 8,
    "explicit"   : "0x149",
    "koopman"    : "0xA4",
    "normal"     : "0x49"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 97, "bytes"   : 12 },
    /* 4 */ { "bits"    : 97, "bytes"   : 12 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^6 + x^3 + x^2 + 1",
    "degree"     : 8,
    "explicit"   : "0x14d",
    "koopman"    : "0xA6",
    "normal"     : "0x4d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 247, "bytes"   : 30 },
    /* 4 */ { "bits"    : 15, "bytes"   : 1 },
    /* 5 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^6 + x^5 + x^1 + 1",
    "degree"     : 8,
    "explicit"   : "0x163",
    "koopman"    : "0xB1",
    "normal"     : "0x63"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 247, "bytes"   : 30 },
    /* 4 */ { "bits"    : 12, "bytes"   : 1 },
    /* 5 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 8,
    "explicit"   : "0x17f",
    "koopman"    : "0xBF",
    "normal"     : "0x7f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 119, "bytes"   : 14 },
    /* 4 */ { "bits"    : 119, "bytes"   : 14 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^7 + x^4 + x^3 + x^1 + 1",
    "degree"     : 8,
    "explicit"   : "0x19b",
    "koopman"    : "0xCD",
    "normal"     : "0x9b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 119, "bytes"   : 14 },
    /* 4 */ { "bits"    : 119, "bytes"   : 14 },
    /* 5 */ { "bits"    : 2, "bytes"   : 0 },
    /* 6 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^7 + x^5 + x^2 + x^1 + 1",
    "degree"     : 8,
    "explicit"   : "0x1a7",
    "koopman"    : "0xD3",
    "normal"     : "0xa7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 119, "bytes"   : 14 },
    /* 4 */ { "bits"    : 119, "bytes"   : 14 },
    /* 5 */ { "bits"    : 3, "bytes"   : 0 },
    /* 6 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^7 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 8,
    "explicit"   : "0x1cf",
    "koopman"    : "0xE7",
    "normal"     : "0xcf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 247, "bytes"   : 30 },
    /* 4 */ { "bits"    : 19, "bytes"   : 2 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^7 + x^6 + x^4 + x^2 + 1",
    "degree"     : 8,
    "explicit"   : "0x1d5",
    "koopman"    : "0xEA",
    "normal"     : "0xd5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 85, "bytes"   : 10 },
    /* 4 */ { "bits"    : 85, "bytes"   : 10 },
    /* 5 */ { "bits"    : 2, "bytes"   : 0 },
    /* 6 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^8 + x^7 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 8,
    "explicit"   : "0x1d7",
    "koopman"    : "0xEB",
    "normal"     : "0xd7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 9, "bytes"   : 1 },
    /* 4 */ { "bits"    : 9, "bytes"   : 1 },
    /* 5 */ { "bits"    : 9, "bytes"   : 1 },
    /* 6 */ { "bits"    : 2, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^4 + 1",
    "degree"     : 9,
    "explicit"   : "0x211",
    "koopman"    : "0x108",
    "normal"     : "0x11"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 502, "bytes"   : 62 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x21f",
    "koopman"    : "0x10F",
    "normal"     : "0x1f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 246, "bytes"   : 30 },
    /* 4 */ { "bits"    : 246, "bytes"   : 30 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^5 + x^4 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x233",
    "koopman"    : "0x119",
    "normal"     : "0x33"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 502, "bytes"   : 62 },
    /* 4 */ { "bits"    : 52, "bytes"   : 6 },
    /* 5 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^6 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x243",
    "koopman"    : "0x121",
    "normal"     : "0x43"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 245, "bytes"   : 30 },
    /* 4 */ { "bits"    : 245, "bytes"   : 30 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x26f",
    "koopman"    : "0x137",
    "normal"     : "0x6f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 502, "bytes"   : 62 },
    /* 4 */ { "bits"    : 4, "bytes"   : 0 },
    /* 5 */ { "bits"    : 4, "bytes"   : 0 },
    /* 6 */ { "bits"    : 4, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^6 + x^5 + x^4 + x^3 + 1",
    "degree"     : 9,
    "explicit"   : "0x279",
    "koopman"    : "0x13C",
    "normal"     : "0x79"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8, "bytes"   : 1 },
    /* 4 */ { "bits"    : 8, "bytes"   : 1 },
    /* 5 */ { "bits"    : 8, "bytes"   : 1 },
    /* 6 */ { "bits"    : 8, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^6 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x27b",
    "koopman"    : "0x13D",
    "normal"     : "0x7b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 5, "bytes"   : 0 },
    /* 4 */ { "bits"    : 5, "bytes"   : 0 },
    /* 5 */ { "bits"    : 5, "bytes"   : 0 },
    /* 6 */ { "bits"    : 5, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^7 + x^2 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x287",
    "koopman"    : "0x143",
    "normal"     : "0x87"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 502, "bytes"   : 62 },
    /* 4 */ { "bits"    : 10, "bytes"   : 1 },
    /* 5 */ { "bits"    : 10, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^7 + x^3 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x28b",
    "koopman"    : "0x145",
    "normal"     : "0x8b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 146, "bytes"   : 18 },
    /* 4 */ { "bits"    : 146, "bytes"   : 18 },
    /* 5 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^7 + x^4 + x^2 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x297",
    "koopman"    : "0x14B",
    "normal"     : "0x97"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 246, "bytes"   : 30 },
    /* 4 */ { "bits"    : 246, "bytes"   : 30 },
    /* 5 */ { "bits"    : 3, "bytes"   : 0 },
    /* 6 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^7 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x29f",
    "koopman"    : "0x14F",
    "normal"     : "0x9f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 75, "bytes"   : 9 },
    /* 4 */ { "bits"    : 11, "bytes"   : 1 },
    /* 5 */ { "bits"    : 9, "bytes"   : 1 },
    /* 6 */ { "bits"    : 4, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^7 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x2af",
    "koopman"    : "0x157",
    "normal"     : "0xaf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 502, "bytes"   : 62 },
    /* 4 */ { "bits"    : 36, "bytes"   : 4 },
    /* 5 */ { "bits"    : 2, "bytes"   : 0 },
    /* 6 */ { "bits"    : 2, "bytes"   : 0 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^7 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x2cf",
    "koopman"    : "0x167",
    "normal"     : "0xcf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 502, "bytes"   : 62 },
    /* 4 */ { "bits"    : 48, "bytes"   : 6 },
    /* 5 */ { "bits"    : 8, "bytes"   : 1 },
    /* 6 */ { "bits"    : 3, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^7 + x^6 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x2fb",
    "koopman"    : "0x17D",
    "normal"     : "0xfb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 246, "bytes"   : 30 },
    /* 4 */ { "bits"    : 246, "bytes"   : 30 },
    /* 5 */ { "bits"    : 5, "bytes"   : 0 },
    /* 6 */ { "bits"    : 5, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^8 + x^3 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x30b",
    "koopman"    : "0x185",
    "normal"     : "0x10b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 96, "bytes"   : 12 },
    /* 4 */ { "bits"    : 16, "bytes"   : 2 },
    /* 5 */ { "bits"    : 13, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^9 + x^8 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 9,
    "explicit"   : "0x37f",
    "koopman"    : "0x1BF",
    "normal"     : "0x17f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 502, "bytes"   : 62 },
    /* 4 */ { "bits"    : 46, "bytes"   : 5 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^3 + 1",
    "degree"     : 10,
    "explicit"   : "0x409",
    "koopman"    : "0x204",
    "normal"     : "0x9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1013, "bytes"   : 126 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^3 + x^2 + 1",
    "degree"     : 10,
    "explicit"   : "0x40d",
    "koopman"    : "0x206",
    "normal"     : "0xd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 501, "bytes"   : 62 },
    /* 4 */ { "bits"    : 501, "bytes"   : 62 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^6 + x^1 + 1",
    "degree"     : 10,
    "explicit"   : "0x443",
    "koopman"    : "0x221",
    "normal"     : "0x43"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 95, "bytes"   : 11 },
    /* 4 */ { "bits"    : 95, "bytes"   : 11 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^7 + x^3 + x^2 + x^1 + 1",
    "degree"     : 10,
    "explicit"   : "0x48f",
    "koopman"    : "0x247",
    "normal"     : "0x8f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 501, "bytes"   : 62 },
    /* 4 */ { "bits"    : 501, "bytes"   : 62 },
    /* 5 */ { "bits"    : 10, "bytes"   : 1 },
    /* 6 */ { "bits"    : 10, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^7 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 10,
    "explicit"   : "0x4bb",
    "koopman"    : "0x25D",
    "normal"     : "0xbb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 305, "bytes"   : 38 },
    /* 4 */ { "bits"    : 305, "bytes"   : 38 },
    /* 5 */ { "bits"    : 5, "bytes"   : 0 },
    /* 6 */ { "bits"    : 3, "bytes"   : 0 },
    /* 7 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^8 + x^4 + x^3 + x^2 + 1",
    "degree"     : 10,
    "explicit"   : "0x51d",
    "koopman"    : "0x28E",
    "normal"     : "0x11d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 95, "bytes"   : 11 },
    /* 4 */ { "bits"    : 95, "bytes"   : 11 },
    /* 5 */ { "bits"    : 12, "bytes"   : 1 },
    /* 6 */ { "bits"    : 12, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^8 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 10,
    "explicit"   : "0x537",
    "koopman"    : "0x29B",
    "normal"     : "0x137"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 5, "bytes"   : 0 },
    /* 4 */ { "bits"    : 5, "bytes"   : 0 },
    /* 5 */ { "bits"    : 5, "bytes"   : 0 },
    /* 6 */ { "bits"    : 5, "bytes"   : 0 },
    /* 7 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^8 + x^6 + x^5 + x^4 + x^1 + 1",
    "degree"     : 10,
    "explicit"   : "0x573",
    "koopman"    : "0x2B9",
    "normal"     : "0x173"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 21, "bytes"   : 2 },
    /* 4 */ { "bits"    : 21, "bytes"   : 2 },
    /* 5 */ { "bits"    : 21, "bytes"   : 2 },
    /* 6 */ { "bits"    : 3, "bytes"   : 0 },
    /* 7 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^8 + x^6 + x^5 + x^4 + x^2 + 1",
    "degree"     : 10,
    "explicit"   : "0x575",
    "koopman"    : "0x2BA",
    "normal"     : "0x175"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 25, "bytes"   : 3 },
    /* 4 */ { "bits"    : 25, "bytes"   : 3 },
    /* 5 */ { "bits"    : 2, "bytes"   : 0 },
    /* 6 */ { "bits"    : 2, "bytes"   : 0 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^8 + x^7 + x^3 + x^2 + x^1 + 1",
    "degree"     : 10,
    "explicit"   : "0x58f",
    "koopman"    : "0x2C7",
    "normal"     : "0x18f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1013, "bytes"   : 126 },
    /* 4 */ { "bits"    : 7, "bytes"   : 0 },
    /* 5 */ { "bits"    : 7, "bytes"   : 0 },
    /* 6 */ { "bits"    : 6, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^8 + x^7 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 10,
    "explicit"   : "0x5bd",
    "koopman"    : "0x2DE",
    "normal"     : "0x1bd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 501, "bytes"   : 62 },
    /* 4 */ { "bits"    : 501, "bytes"   : 62 },
    /* 5 */ { "bits"    : 5, "bytes"   : 0 },
    /* 6 */ { "bits"    : 5, "bytes"   : 0 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 10,
    "explicit"   : "0x5fb",
    "koopman"    : "0x2FD",
    "normal"     : "0x1fb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1013, "bytes"   : 126 },
    /* 4 */ { "bits"    : 16, "bytes"   : 2 },
    /* 5 */ { "bits"    : 16, "bytes"   : 2 },
    /* 6 */ { "bits"    : 5, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^9 + x^5 + x^4 + x^1 + 1",
    "degree"     : 10,
    "explicit"   : "0x633",
    "koopman"    : "0x319",
    "normal"     : "0x233"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 501, "bytes"   : 62 },
    /* 4 */ { "bits"    : 501, "bytes"   : 62 },
    /* 5 */ { "bits"    : 3, "bytes"   : 0 },
    /* 6 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^9 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 10,
    "explicit"   : "0x64f",
    "koopman"    : "0x327",
    "normal"     : "0x24f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1013, "bytes"   : 126 },
    /* 4 */ { "bits"    : 73, "bytes"   : 9 },
    /* 5 */ { "bits"    : 10, "bytes"   : 1 },
    /* 6 */ { "bits"    : 5, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^9 + x^8 + x^7 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 10,
    "explicit"   : "0x7bf",
    "koopman"    : "0x3DF",
    "normal"     : "0x3bf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 501, "bytes"   : 62 },
    /* 4 */ { "bits"    : 501, "bytes"   : 62 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^10 + x^9 + x^8 + x^7 + x^6 + x^4 + x^3 + 1",
    "degree"     : 10,
    "explicit"   : "0x7d9",
    "koopman"    : "0x3EC",
    "normal"     : "0x3d9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 501, "bytes"   : 62 },
    /* 4 */ { "bits"    : 501, "bytes"   : 62 },
    /* 5 */ { "bits"    : 4, "bytes"   : 0 },
    /* 6 */ { "bits"    : 4, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^2 + 1",
    "degree"     : 11,
    "explicit"   : "0x805",
    "koopman"    : "0x402",
    "normal"     : "0x5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2036, "bytes"   : 254 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^3 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0x80b",
    "koopman"    : "0x405",
    "normal"     : "0xb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1012, "bytes"   : 126 },
    /* 4 */ { "bits"    : 1012, "bytes"   : 126 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0x867",
    "koopman"    : "0x433",
    "normal"     : "0x67"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 20, "bytes"   : 2 },
    /* 4 */ { "bits"    : 20, "bytes"   : 2 },
    /* 5 */ { "bits"    : 20, "bytes"   : 2 },
    /* 6 */ { "bits"    : 20, "bytes"   : 2 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^7 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0x8e7",
    "koopman"    : "0x473",
    "normal"     : "0xe7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2036, "bytes"   : 254 },
    /* 4 */ { "bits"    : 46, "bytes"   : 5 },
    /* 5 */ { "bits"    : 9, "bytes"   : 1 },
    /* 6 */ { "bits"    : 9, "bytes"   : 1 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^8 + x^7 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0x9eb",
    "koopman"    : "0x4F5",
    "normal"     : "0x1eb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1012, "bytes"   : 126 },
    /* 4 */ { "bits"    : 1012, "bytes"   : 126 },
    /* 5 */ { "bits"    : 6, "bytes"   : 0 },
    /* 6 */ { "bits"    : 6, "bytes"   : 0 },
    /* 7 */ { "bits"    : 4, "bytes"   : 0 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^9 + x^6 + x^5 + x^2 + 1",
    "degree"     : 11,
    "explicit"   : "0xa65",
    "koopman"    : "0x532",
    "normal"     : "0x265"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 22, "bytes"   : 2 },
    /* 4 */ { "bits"    : 22, "bytes"   : 2 },
    /* 5 */ { "bits"    : 22, "bytes"   : 2 },
    /* 6 */ { "bits"    : 22, "bytes"   : 2 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^9 + x^7 + x^6 + x^5 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0xae3",
    "koopman"    : "0x571",
    "normal"     : "0x2e3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 12, "bytes"   : 1 },
    /* 4 */ { "bits"    : 12, "bytes"   : 1 },
    /* 5 */ { "bits"    : 12, "bytes"   : 1 },
    /* 6 */ { "bits"    : 12, "bytes"   : 1 },
    /* 7 */ { "bits"    : 12, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^9 + x^8 + x^2 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0xb07",
    "koopman"    : "0x583",
    "normal"     : "0x307"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1012, "bytes"   : 126 },
    /* 4 */ { "bits"    : 1012, "bytes"   : 126 },
    /* 5 */ { "bits"    : 17, "bytes"   : 2 },
    /* 6 */ { "bits"    : 17, "bytes"   : 2 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^9 + x^8 + x^7 + x^2 + 1",
    "degree"     : 11,
    "explicit"   : "0xb85",
    "koopman"    : "0x5C2",
    "normal"     : "0x385"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 20, "bytes"   : 2 },
    /* 4 */ { "bits"    : 20, "bytes"   : 2 },
    /* 5 */ { "bits"    : 20, "bytes"   : 2 },
    /* 6 */ { "bits"    : 20, "bytes"   : 2 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^9 + x^8 + x^7 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0xbaf",
    "koopman"    : "0x5D7",
    "normal"     : "0x3af"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2036, "bytes"   : 254 },
    /* 4 */ { "bits"    : 28, "bytes"   : 3 },
    /* 5 */ { "bits"    : 26, "bytes"   : 3 },
    /* 6 */ { "bits"    : 3, "bytes"   : 0 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^9 + x^8 + x^7 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0xbb7",
    "koopman"    : "0x5DB",
    "normal"     : "0x3b7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2036, "bytes"   : 254 },
    /* 4 */ { "bits"    : 132, "bytes"   : 16 },
    /* 5 */ { "bits"    : 16, "bytes"   : 2 },
    /* 6 */ { "bits"    : 2, "bytes"   : 0 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^9 + x^8 + x^7 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0xbdf",
    "koopman"    : "0x5EF",
    "normal"     : "0x3df"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1012, "bytes"   : 126 },
    /* 4 */ { "bits"    : 1012, "bytes"   : 126 },
    /* 5 */ { "bits"    : 7, "bytes"   : 0 },
    /* 6 */ { "bits"    : 7, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^10 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0xc57",
    "koopman"    : "0x62B",
    "normal"     : "0x457"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2036, "bytes"   : 254 },
    /* 4 */ { "bits"    : 53, "bytes"   : 6 },
    /* 5 */ { "bits"    : 17, "bytes"   : 2 },
    /* 6 */ { "bits"    : 5, "bytes"   : 0 },
    /* 7 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^10 + x^7 + x^4 + x^3 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0xc9b",
    "koopman"    : "0x64D",
    "normal"     : "0x49b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2036, "bytes"   : 254 },
    /* 4 */ { "bits"    : 131, "bytes"   : 16 },
    /* 5 */ { "bits"    : 6, "bytes"   : 0 },
    /* 6 */ { "bits"    : 6, "bytes"   : 0 },
    /* 7 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^10 + x^8 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0xd77",
    "koopman"    : "0x6BB",
    "normal"     : "0x577"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 624, "bytes"   : 78 },
    /* 4 */ { "bits"    : 624, "bytes"   : 78 },
    /* 5 */ { "bits"    : 9, "bytes"   : 1 },
    /* 6 */ { "bits"    : 2, "bytes"   : 0 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^10 + x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0xdfb",
    "koopman"    : "0x6FD",
    "normal"     : "0x5fb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 22, "bytes"   : 2 },
    /* 4 */ { "bits"    : 22, "bytes"   : 2 },
    /* 5 */ { "bits"    : 22, "bytes"   : 2 },
    /* 6 */ { "bits"    : 22, "bytes"   : 2 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^11 + x^10 + x^9 + x^8 + x^7 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 11,
    "explicit"   : "0xfbf",
    "koopman"    : "0x7DF",
    "normal"     : "0x7bf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1942, "bytes"   : 242 },
    /* 4 */ { "bits"    : 48, "bytes"   : 6 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x102f",
    "koopman"    : "0x817",
    "normal"     : "0x2f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2035, "bytes"   : 254 },
    /* 4 */ { "bits"    : 2035, "bytes"   : 254 },
    /* 5 */ { "bits"    : 14, "bytes"   : 1 },
    /* 6 */ { "bits"    : 14, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^6 + x^4 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x1053",
    "koopman"    : "0x829",
    "normal"     : "0x53"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4083, "bytes"   : 510 },
    /* 4 */ { "bits"    : 95, "bytes"   : 11 },
    /* 5 */ { "bits"    : 16, "bytes"   : 2 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^6 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 12,
    "explicit"   : "0x107d",
    "koopman"    : "0x83E",
    "normal"     : "0x7d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4083, "bytes"   : 510 },
    /* 4 */ { "bits"    : 22, "bytes"   : 2 },
    /* 5 */ { "bits"    : 15, "bytes"   : 1 },
    /* 6 */ { "bits"    : 15, "bytes"   : 1 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^8 + x^7 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x11e7",
    "koopman"    : "0x8F3",
    "normal"     : "0x1e7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2035, "bytes"   : 254 },
    /* 4 */ { "bits"    : 2035, "bytes"   : 254 },
    /* 5 */ { "bits"    : 25, "bytes"   : 3 },
    /* 6 */ { "bits"    : 25, "bytes"   : 3 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^8 + x^7 + x^6 + x^5 + x^4 + 1",
    "degree"     : 12,
    "explicit"   : "0x11f1",
    "koopman"    : "0x8F8",
    "normal"     : "0x1f1"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 53, "bytes"   : 6 },
    /* 4 */ { "bits"    : 53, "bytes"   : 6 },
    /* 5 */ { "bits"    : 53, "bytes"   : 6 },
    /* 6 */ { "bits"    : 10, "bytes"   : 1 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^9 + x^8 + x^3 + x^2 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x130f",
    "koopman"    : "0x987",
    "normal"     : "0x30f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4083, "bytes"   : 510 },
    /* 4 */ { "bits"    : 159, "bytes"   : 19 },
    /* 5 */ { "bits"    : 17, "bytes"   : 2 },
    /* 6 */ { "bits"    : 8, "bytes"   : 1 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^9 + x^8 + x^5 + x^2 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x1327",
    "koopman"    : "0x993",
    "normal"     : "0x327"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 498, "bytes"   : 62 },
    /* 4 */ { "bits"    : 74, "bytes"   : 9 },
    /* 5 */ { "bits"    : 24, "bytes"   : 3 },
    /* 6 */ { "bits"    : 8, "bytes"   : 1 },
    /* 7 */ { "bits"    : 8, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^10 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x1467",
    "koopman"    : "0xA33",
    "normal"     : "0x467"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4083, "bytes"   : 510 },
    /* 4 */ { "bits"    : 149, "bytes"   : 18 },
    /* 5 */ { "bits"    : 10, "bytes"   : 1 },
    /* 6 */ { "bits"    : 6, "bytes"   : 0 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^10 + x^7 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x149f",
    "koopman"    : "0xA4F",
    "normal"     : "0x49f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 11, "bytes"   : 1 },
    /* 4 */ { "bits"    : 11, "bytes"   : 1 },
    /* 5 */ { "bits"    : 11, "bytes"   : 1 },
    /* 6 */ { "bits"    : 11, "bytes"   : 1 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^10 + x^7 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x14df",
    "koopman"    : "0xA6F",
    "normal"     : "0x4df"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 443, "bytes"   : 55 },
    /* 4 */ { "bits"    : 183, "bytes"   : 22 },
    /* 5 */ { "bits"    : 12, "bytes"   : 1 },
    /* 6 */ { "bits"    : 12, "bytes"   : 1 },
    /* 7 */ { "bits"    : 5, "bytes"   : 0 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^10 + x^9 + x^7 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x1683",
    "koopman"    : "0xB41",
    "normal"     : "0x683"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1773, "bytes"   : 221 },
    /* 4 */ { "bits"    : 1773, "bytes"   : 221 },
    /* 5 */ { "bits"    : 27, "bytes"   : 3 },
    /* 6 */ { "bits"    : 27, "bytes"   : 3 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^10 + x^9 + x^7 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x16eb",
    "koopman"    : "0xB75",
    "normal"     : "0x6eb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2655, "bytes"   : 331 },
    /* 4 */ { "bits"    : 52, "bytes"   : 6 },
    /* 5 */ { "bits"    : 24, "bytes"   : 3 },
    /* 6 */ { "bits"    : 2, "bytes"   : 0 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^10 + x^9 + x^8 + x^5 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x1723",
    "koopman"    : "0xB91",
    "normal"     : "0x723"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073, "bytes"   : 134 },
    /* 4 */ { "bits"    : 1073, "bytes"   : 134 },
    /* 5 */ { "bits"    : 27, "bytes"   : 3 },
    /* 6 */ { "bits"    : 7, "bytes"   : 0 },
    /* 7 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^10 + x^9 + x^8 + x^6 + x^4 + x^3 + x^2 + 1",
    "degree"     : 12,
    "explicit"   : "0x175d",
    "koopman"    : "0xBAE",
    "normal"     : "0x75d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 53, "bytes"   : 6 },
    /* 4 */ { "bits"    : 53, "bytes"   : 6 },
    /* 5 */ { "bits"    : 53, "bytes"   : 6 },
    /* 6 */ { "bits"    : 10, "bytes"   : 1 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^10 + x^9 + x^8 + x^7 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x17bf",
    "koopman"    : "0xBDF",
    "normal"     : "0x7bf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4083, "bytes"   : 510 },
    /* 4 */ { "bits"    : 59, "bytes"   : 7 },
    /* 5 */ { "bits"    : 33, "bytes"   : 4 },
    /* 6 */ { "bits"    : 6, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^10 + x^9 + x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x17ff",
    "koopman"    : "0xBFF",
    "normal"     : "0x7ff"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2035, "bytes"   : 254 },
    /* 4 */ { "bits"    : 2035, "bytes"   : 254 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^11 + x^3 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x180b",
    "koopman"    : "0xC05",
    "normal"     : "0x80b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 498, "bytes"   : 62 },
    /* 4 */ { "bits"    : 160, "bytes"   : 20 },
    /* 5 */ { "bits"    : 24, "bytes"   : 3 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^11 + x^3 + x^2 + 1",
    "degree"     : 12,
    "explicit"   : "0x180d",
    "koopman"    : "0xC06",
    "normal"     : "0x80d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 79, "bytes"   : 9 },
    /* 4 */ { "bits"    : 27, "bytes"   : 3 },
    /* 5 */ { "bits"    : 24, "bytes"   : 3 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^11 + x^3 + x^2 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x180f",
    "koopman"    : "0xC07",
    "normal"     : "0x80f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2035, "bytes"   : 254 },
    /* 4 */ { "bits"    : 2035, "bytes"   : 254 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^11 + x^9 + x^8 + x^7 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x1bbf",
    "koopman"    : "0xDDF",
    "normal"     : "0xbbf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4083, "bytes"   : 510 },
    /* 4 */ { "bits"    : 71, "bytes"   : 8 },
    /* 5 */ { "bits"    : 10, "bytes"   : 1 },
    /* 6 */ { "bits"    : 8, "bytes"   : 1 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^11 + x^10 + x^8 + x^5 + x^4 + 1",
    "degree"     : 12,
    "explicit"   : "0x1d31",
    "koopman"    : "0xE98",
    "normal"     : "0xd31"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073, "bytes"   : 134 },
    /* 4 */ { "bits"    : 1073, "bytes"   : 134 },
    /* 5 */ { "bits"    : 13, "bytes"   : 1 },
    /* 6 */ { "bits"    : 5, "bytes"   : 0 },
    /* 7 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^12 + x^11 + x^10 + x^9 + x^8 + x^4 + x^1 + 1",
    "degree"     : 12,
    "explicit"   : "0x1f13",
    "koopman"    : "0xF89",
    "normal"     : "0xf13"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2035, "bytes"   : 254 },
    /* 4 */ { "bits"    : 2035, "bytes"   : 254 },
    /* 5 */ { "bits"    : 16, "bytes"   : 2 },
    /* 6 */ { "bits"    : 16, "bytes"   : 2 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^4 + x^3 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x201b",
    "koopman"    : "0x100D",
    "normal"     : "0x1b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8178, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 81, "bytes"   : 10 },
    /* 5 */ { "bits"    : 26, "bytes"   : 3 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^6 + x^4 + x^2 + 1",
    "degree"     : 13,
    "explicit"   : "0x2055",
    "koopman"    : "0x102A",
    "normal"     : "0x55"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2542, "bytes"   : 317 },
    /* 4 */ { "bits"    : 2542, "bytes"   : 317 },
    /* 5 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x205b",
    "koopman"    : "0x102D",
    "normal"     : "0x5b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4082, "bytes"   : 510 },
    /* 4 */ { "bits"    : 4082, "bytes"   : 510 },
    /* 5 */ { "bits"    : 14, "bytes"   : 1 },
    /* 6 */ { "bits"    : 14, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^6 + x^5 + x^3 + x^2 + 1",
    "degree"     : 13,
    "explicit"   : "0x206d",
    "koopman"    : "0x1036",
    "normal"     : "0x6d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 3924, "bytes"   : 490 },
    /* 4 */ { "bits"    : 3924, "bytes"   : 490 },
    /* 5 */ { "bits"    : 32, "bytes"   : 4 },
    /* 6 */ { "bits"    : 32, "bytes"   : 4 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^8 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x216f",
    "koopman"    : "0x10B7",
    "normal"     : "0x16f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33, "bytes"   : 4 },
    /* 4 */ { "bits"    : 33, "bytes"   : 4 },
    /* 5 */ { "bits"    : 11, "bytes"   : 1 },
    /* 6 */ { "bits"    : 11, "bytes"   : 1 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^9 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x223b",
    "koopman"    : "0x111D",
    "normal"     : "0x23b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 638, "bytes"   : 79 },
    /* 4 */ { "bits"    : 638, "bytes"   : 79 },
    /* 5 */ { "bits"    : 21, "bytes"   : 2 },
    /* 6 */ { "bits"    : 21, "bytes"   : 2 },
    /* 7 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^9 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x225b",
    "koopman"    : "0x112D",
    "normal"     : "0x25b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8178, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 75, "bytes"   : 9 },
    /* 5 */ { "bits"    : 49, "bytes"   : 6 },
    /* 6 */ { "bits"    : 16, "bytes"   : 2 },
    /* 7 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^10 + x^8 + x^6 + x^3 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x254b",
    "koopman"    : "0x12A5",
    "normal"     : "0x54b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 56, "bytes"   : 7 },
    /* 4 */ { "bits"    : 56, "bytes"   : 7 },
    /* 5 */ { "bits"    : 13, "bytes"   : 1 },
    /* 6 */ { "bits"    : 13, "bytes"   : 1 },
    /* 7 */ { "bits"    : 12, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^10 + x^8 + x^7 + x^6 + x^3 + x^2 + 1",
    "degree"     : 13,
    "explicit"   : "0x25cd",
    "koopman"    : "0x12E6",
    "normal"     : "0x5cd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4082, "bytes"   : 510 },
    /* 4 */ { "bits"    : 4082, "bytes"   : 510 },
    /* 5 */ { "bits"    : 32, "bytes"   : 4 },
    /* 6 */ { "bits"    : 32, "bytes"   : 4 },
    /* 7 */ { "bits"    : 4, "bytes"   : 0 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^11 + x^8 + x^5 + x^3 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x292b",
    "koopman"    : "0x1495",
    "normal"     : "0x92b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8178, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 108, "bytes"   : 13 },
    /* 5 */ { "bits"    : 21, "bytes"   : 2 },
    /* 6 */ { "bits"    : 15, "bytes"   : 1 },
    /* 7 */ { "bits"    : 9, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^11 + x^9 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x2a6f",
    "koopman"    : "0x1537",
    "normal"     : "0xa6f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8178, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 33, "bytes"   : 4 },
    /* 5 */ { "bits"    : 16, "bytes"   : 2 },
    /* 6 */ { "bits"    : 14, "bytes"   : 1 },
    /* 7 */ { "bits"    : 5, "bytes"   : 0 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^11 + x^10 + x^9 + x^7 + x^3 + x^2 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x2e8f",
    "koopman"    : "0x1747",
    "normal"     : "0xe8f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8178, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 233, "bytes"   : 29 },
    /* 5 */ { "bits"    : 34, "bytes"   : 4 },
    /* 6 */ { "bits"    : 7, "bytes"   : 0 },
    /* 7 */ { "bits"    : 7, "bytes"   : 0 },
    /* 8 */ { "bits"    : 7, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^11 + x^10 + x^9 + x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x2fff",
    "koopman"    : "0x17FF",
    "normal"     : "0xfff"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8178, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 59, "bytes"   : 7 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^12 + x^7 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x30ef",
    "koopman"    : "0x1877",
    "normal"     : "0x10ef"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8178, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 50, "bytes"   : 6 },
    /* 5 */ { "bits"    : 50, "bytes"   : 6 },
    /* 6 */ { "bits"    : 7, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^12 + x^9 + x^4 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x3213",
    "koopman"    : "0x1909",
    "normal"     : "0x1213"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 52, "bytes"   : 6 },
    /* 4 */ { "bits"    : 52, "bytes"   : 6 },
    /* 5 */ { "bits"    : 52, "bytes"   : 6 },
    /* 6 */ { "bits"    : 52, "bytes"   : 6 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^12 + x^10 + x^8 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x357f",
    "koopman"    : "0x1ABF",
    "normal"     : "0x157f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8178, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 324, "bytes"   : 40 },
    /* 5 */ { "bits"    : 31, "bytes"   : 3 },
    /* 6 */ { "bits"    : 6, "bytes"   : 0 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^12 + x^10 + x^8 + x^7 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x35d7",
    "koopman"    : "0x1AEB",
    "normal"     : "0x15d7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4082, "bytes"   : 510 },
    /* 4 */ { "bits"    : 4082, "bytes"   : 510 },
    /* 5 */ { "bits"    : 18, "bytes"   : 2 },
    /* 6 */ { "bits"    : 18, "bytes"   : 2 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^12 + x^11 + x^7 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x38d7",
    "koopman"    : "0x1C6B",
    "normal"     : "0x18d7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2542, "bytes"   : 317 },
    /* 4 */ { "bits"    : 2542, "bytes"   : 317 },
    /* 5 */ { "bits"    : 34, "bytes"   : 4 },
    /* 6 */ { "bits"    : 14, "bytes"   : 1 },
    /* 7 */ { "bits"    : 4, "bytes"   : 0 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^12 + x^11 + x^9 + x^8 + x^7 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x3bef",
    "koopman"    : "0x1DF7",
    "normal"     : "0x1bef"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4082, "bytes"   : 510 },
    /* 4 */ { "bits"    : 4082, "bytes"   : 510 },
    /* 5 */ { "bits"    : 14, "bytes"   : 1 },
    /* 6 */ { "bits"    : 14, "bytes"   : 1 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^12 + x^11 + x^10 + x^7 + x^6 + x^5 + x^4 + x^2 + 1",
    "degree"     : 13,
    "explicit"   : "0x3cf5",
    "koopman"    : "0x1E7A",
    "normal"     : "0x1cf5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 165, "bytes"   : 20 },
    /* 4 */ { "bits"    : 165, "bytes"   : 20 },
    /* 5 */ { "bits"    : 14, "bytes"   : 1 },
    /* 6 */ { "bits"    : 14, "bytes"   : 1 },
    /* 7 */ { "bits"    : 3, "bytes"   : 0 },
    /* 8 */ { "bits"    : 3, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^13 + x^12 + x^11 + x^10 + x^8 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 13,
    "explicit"   : "0x3d2f",
    "koopman"    : "0x1E97",
    "normal"     : "0x1d2f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 52, "bytes"   : 6 },
    /* 4 */ { "bits"    : 52, "bytes"   : 6 },
    /* 5 */ { "bits"    : 52, "bytes"   : 6 },
    /* 6 */ { "bits"    : 52, "bytes"   : 6 },
    /* 7 */ { "bits"    : 4, "bytes"   : 0 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^2 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x4007",
    "koopman"    : "0x2003",
    "normal"     : "0x7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8177, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 8177, "bytes"   : 1022 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^5 + x^3 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x402b",
    "koopman"    : "0x2015",
    "normal"     : "0x2b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16369, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 210, "bytes"   : 26 },
    /* 5 */ { "bits"    : 33, "bytes"   : 4 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^8 + x^7 + x^6 + x^4 + x^3 + x^2 + 1",
    "degree"     : 14,
    "explicit"   : "0x41dd",
    "koopman"    : "0x20EE",
    "normal"     : "0x1dd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 112, "bytes"   : 14 },
    /* 4 */ { "bits"    : 112, "bytes"   : 14 },
    /* 5 */ { "bits"    : 50, "bytes"   : 6 },
    /* 6 */ { "bits"    : 50, "bytes"   : 6 },
    /* 7 */ { "bits"    : 3, "bytes"   : 0 },
    /* 8 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^9 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x425b",
    "koopman"    : "0x212D",
    "normal"     : "0x25b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 113, "bytes"   : 14 },
    /* 4 */ { "bits"    : 113, "bytes"   : 14 },
    /* 5 */ { "bits"    : 113, "bytes"   : 14 },
    /* 6 */ { "bits"    : 21, "bytes"   : 2 },
    /* 7 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^9 + x^8 + x^7 + x^6 + x^4 + 1",
    "degree"     : 14,
    "explicit"   : "0x43d1",
    "koopman"    : "0x21E8",
    "normal"     : "0x3d1"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 5101, "bytes"   : 637 },
    /* 4 */ { "bits"    : 5101, "bytes"   : 637 },
    /* 5 */ { "bits"    : 12, "bytes"   : 1 },
    /* 6 */ { "bits"    : 12, "bytes"   : 1 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^10 + x^9 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 14,
    "explicit"   : "0x463d",
    "koopman"    : "0x231E",
    "normal"     : "0x63d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8177, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 8177, "bytes"   : 1022 },
    /* 5 */ { "bits"    : 27, "bytes"   : 3 },
    /* 6 */ { "bits"    : 27, "bytes"   : 3 },
    /* 7 */ { "bits"    : 4, "bytes"   : 0 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^10 + x^9 + x^6 + x^2 + 1",
    "degree"     : 14,
    "explicit"   : "0x4645",
    "koopman"    : "0x2322",
    "normal"     : "0x645"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8177, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 8177, "bytes"   : 1022 },
    /* 5 */ { "bits"    : 57, "bytes"   : 7 },
    /* 6 */ { "bits"    : 57, "bytes"   : 7 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^10 + x^9 + x^7 + x^6 + x^5 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x46e3",
    "koopman"    : "0x2371",
    "normal"     : "0x6e3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 78, "bytes"   : 9 },
    /* 4 */ { "bits"    : 78, "bytes"   : 9 },
    /* 5 */ { "bits"    : 11, "bytes"   : 1 },
    /* 6 */ { "bits"    : 11, "bytes"   : 1 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^11 + x^2 + 1",
    "degree"     : 14,
    "explicit"   : "0x4805",
    "koopman"    : "0x2402",
    "normal"     : "0x805"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8177, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 8177, "bytes"   : 1022 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^11 + x^10 + x^9 + x^7 + x^6 + x^4 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x4ed3",
    "koopman"    : "0x2769",
    "normal"     : "0xed3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16369, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 134, "bytes"   : 16 },
    /* 5 */ { "bits"    : 32, "bytes"   : 4 },
    /* 6 */ { "bits"    : 26, "bytes"   : 3 },
    /* 7 */ { "bits"    : 4, "bytes"   : 0 },
    /* 8 */ { "bits"    : 3, "bytes"   : 0 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^11 + x^10 + x^9 + x^8 + x^7 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x4f9f",
    "koopman"    : "0x27CF",
    "normal"     : "0xf9f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16369, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 459, "bytes"   : 57 },
    /* 5 */ { "bits"    : 17, "bytes"   : 2 },
    /* 6 */ { "bits"    : 5, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^12 + x^8 + x^6 + x^4 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x5153",
    "koopman"    : "0x28A9",
    "normal"     : "0x1153"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16369, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 317, "bytes"   : 39 },
    /* 5 */ { "bits"    : 46, "bytes"   : 5 },
    /* 6 */ { "bits"    : 14, "bytes"   : 1 },
    /* 7 */ { "bits"    : 13, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^12 + x^8 + x^7 + x^6 + x^4 + x^3 + x^2 + 1",
    "degree"     : 14,
    "explicit"   : "0x51dd",
    "koopman"    : "0x28EE",
    "normal"     : "0x11dd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1771, "bytes"   : 221 },
    /* 4 */ { "bits"    : 1771, "bytes"   : 221 },
    /* 5 */ { "bits"    : 30, "bytes"   : 3 },
    /* 6 */ { "bits"    : 30, "bytes"   : 3 },
    /* 7 */ { "bits"    : 7, "bytes"   : 0 },
    /* 8 */ { "bits"    : 3, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^12 + x^10 + x^7 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x549f",
    "koopman"    : "0x2A4F",
    "normal"     : "0x149f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16369, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 24, "bytes"   : 3 },
    /* 5 */ { "bits"    : 24, "bytes"   : 3 },
    /* 6 */ { "bits"    : 8, "bytes"   : 1 },
    /* 7 */ { "bits"    : 7, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^12 + x^10 + x^8 + x^7 + x^4 + x^3 + x^2 + 1",
    "degree"     : 14,
    "explicit"   : "0x559d",
    "koopman"    : "0x2ACE",
    "normal"     : "0x159d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1351, "bytes"   : 168 },
    /* 4 */ { "bits"    : 311, "bytes"   : 38 },
    /* 5 */ { "bits"    : 38, "bytes"   : 4 },
    /* 6 */ { "bits"    : 10, "bytes"   : 1 },
    /* 7 */ { "bits"    : 10, "bytes"   : 1 },
    /* 8 */ { "bits"    : 10, "bytes"   : 1 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^12 + x^11 + x^10 + x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x5dfb",
    "koopman"    : "0x2EFD",
    "normal"     : "0x1dfb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 55, "bytes"   : 6 },
    /* 4 */ { "bits"    : 55, "bytes"   : 6 },
    /* 5 */ { "bits"    : 12, "bytes"   : 1 },
    /* 6 */ { "bits"    : 12, "bytes"   : 1 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^12 + x^11 + x^10 + x^9 + x^8 + x^7 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x5ff7",
    "koopman"    : "0x2FFB",
    "normal"     : "0x1ff7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 5101, "bytes"   : 637 },
    /* 4 */ { "bits"    : 5101, "bytes"   : 637 },
    /* 5 */ { "bits"    : 31, "bytes"   : 3 },
    /* 6 */ { "bits"    : 9, "bytes"   : 1 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^13 + x^5 + x^3 + x^2 + 1",
    "degree"     : 14,
    "explicit"   : "0x602d",
    "koopman"    : "0x3016",
    "normal"     : "0x202d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8177, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 8177, "bytes"   : 1022 },
    /* 5 */ { "bits"    : 25, "bytes"   : 3 },
    /* 6 */ { "bits"    : 25, "bytes"   : 3 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^13 + x^10 + x^9 + x^8 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x6757",
    "koopman"    : "0x33AB",
    "normal"     : "0x2757"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8177, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 8177, "bytes"   : 1022 },
    /* 5 */ { "bits"    : 9, "bytes"   : 1 },
    /* 6 */ { "bits"    : 9, "bytes"   : 1 },
    /* 7 */ { "bits"    : 7, "bytes"   : 0 },
    /* 8 */ { "bits"    : 7, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^13 + x^11 + x^8 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x692f",
    "koopman"    : "0x3497",
    "normal"     : "0x292f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16369, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 197, "bytes"   : 24 },
    /* 5 */ { "bits"    : 49, "bytes"   : 6 },
    /* 6 */ { "bits"    : 18, "bytes"   : 2 },
    /* 7 */ { "bits"    : 8, "bytes"   : 1 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^13 + x^11 + x^10 + x^9 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x6e57",
    "koopman"    : "0x372B",
    "normal"     : "0x2e57"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8176, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 8176, "bytes"   : 1022 },
    /* 5 */ { "bits"    : 57, "bytes"   : 7 },
    /* 6 */ { "bits"    : 57, "bytes"   : 7 },
    /* 7 */ { "bits"    : 3, "bytes"   : 0 },
    /* 8 */ { "bits"    : 3, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^13 + x^11 + x^10 + x^9 + x^8 + x^7 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x6fdf",
    "koopman"    : "0x37EF",
    "normal"     : "0x2fdf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16369, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 260, "bytes"   : 32 },
    /* 5 */ { "bits"    : 69, "bytes"   : 8 },
    /* 6 */ { "bits"    : 19, "bytes"   : 2 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^13 + x^11 + x^10 + x^9 + x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x6fff",
    "koopman"    : "0x37FF",
    "normal"     : "0x2fff"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8177, "bytes"   : 1022 },
    /* 4 */ { "bits"    : 8177, "bytes"   : 1022 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^13 + x^12 + x^10 + x^8 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x7577",
    "koopman"    : "0x3ABB",
    "normal"     : "0x3577"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16369, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 204, "bytes"   : 25 },
    /* 5 */ { "bits"    : 18, "bytes"   : 2 },
    /* 6 */ { "bits"    : 18, "bytes"   : 2 },
    /* 7 */ { "bits"    : 8, "bytes"   : 1 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^14 + x^13 + x^12 + x^11 + x^10 + x^8 + x^7 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 14,
    "explicit"   : "0x7ddf",
    "koopman"    : "0x3EEF",
    "normal"     : "0x3ddf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 113, "bytes"   : 14 },
    /* 4 */ { "bits"    : 113, "bytes"   : 14 },
    /* 5 */ { "bits"    : 113, "bytes"   : 14 },
    /* 6 */ { "bits"    : 21, "bytes"   : 2 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0x8003",
    "koopman"    : "0x4001",
    "normal"     : "0x3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32752, "bytes"   : 4094 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^5 + x^3 + 1",
    "degree"     : 15,
    "explicit"   : "0x8029",
    "koopman"    : "0x4014",
    "normal"     : "0x29"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16368, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 16368, "bytes"   : 2046 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^7 + x^4 + x^2 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0x8097",
    "koopman"    : "0x404B",
    "normal"     : "0x97"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16368, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 16368, "bytes"   : 2046 },
    /* 5 */ { "bits"    : 60, "bytes"   : 7 },
    /* 6 */ { "bits"    : 60, "bytes"   : 7 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^10 + x^9 + x^3 + x^2 + 1",
    "degree"     : 15,
    "explicit"   : "0x860d",
    "koopman"    : "0x4306",
    "normal"     : "0x60d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16368, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 16368, "bytes"   : 2046 },
    /* 5 */ { "bits"    : 68, "bytes"   : 8 },
    /* 6 */ { "bits"    : 68, "bytes"   : 8 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^12 + x^7 + x^5 + x^4 + x^3 + 1",
    "degree"     : 15,
    "explicit"   : "0x90b9",
    "koopman"    : "0x485C",
    "normal"     : "0x10b9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 48, "bytes"   : 6 },
    /* 4 */ { "bits"    : 48, "bytes"   : 6 },
    /* 5 */ { "bits"    : 48, "bytes"   : 6 },
    /* 6 */ { "bits"    : 48, "bytes"   : 6 },
    /* 7 */ { "bits"    : 9, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^12 + x^9 + x^7 + x^6 + x^5 + x^3 + x^2 + 1",
    "degree"     : 15,
    "explicit"   : "0x92ed",
    "koopman"    : "0x4976",
    "normal"     : "0x12ed"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 10220, "bytes"   : 1277 },
    /* 4 */ { "bits"    : 10220, "bytes"   : 1277 },
    /* 5 */ { "bits"    : 60, "bytes"   : 7 },
    /* 6 */ { "bits"    : 18, "bytes"   : 2 },
    /* 7 */ { "bits"    : 3, "bytes"   : 0 },
    /* 8 */ { "bits"    : 3, "bytes"   : 0 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^12 + x^10 + x^9 + x^8 + x^7 + x^6 + x^5 + x^4 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0x97f3",
    "koopman"    : "0x4BF9",
    "normal"     : "0x17f3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32752, "bytes"   : 4094 },
    /* 4 */ { "bits"    : 195, "bytes"   : 24 },
    /* 5 */ { "bits"    : 36, "bytes"   : 4 },
    /* 6 */ { "bits"    : 36, "bytes"   : 4 },
    /* 7 */ { "bits"    : 9, "bytes"   : 1 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^12 + x^11 + x^9 + x^6 + x^5 + x^4 + x^3 + 1",
    "degree"     : 15,
    "explicit"   : "0x9a79",
    "koopman"    : "0x4D3C",
    "normal"     : "0x1a79"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32752, "bytes"   : 4094 },
    /* 4 */ { "bits"    : 190, "bytes"   : 23 },
    /* 5 */ { "bits"    : 94, "bytes"   : 11 },
    /* 6 */ { "bits"    : 10, "bytes"   : 1 },
    /* 7 */ { "bits"    : 10, "bytes"   : 1 },
    /* 8 */ { "bits"    : 3, "bytes"   : 0 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^12 + x^11 + x^9 + x^7 + x^6 + x^3 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0x9acb",
    "koopman"    : "0x4D65",
    "normal"     : "0x1acb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1042, "bytes"   : 130 },
    /* 4 */ { "bits"    : 178, "bytes"   : 22 },
    /* 5 */ { "bits"    : 50, "bytes"   : 6 },
    /* 6 */ { "bits"    : 19, "bytes"   : 2 },
    /* 7 */ { "bits"    : 13, "bytes"   : 1 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^12 + x^11 + x^10 + x^9 + x^6 + x^2 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0x9e47",
    "koopman"    : "0x4F23",
    "normal"     : "0x1e47"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32752, "bytes"   : 4094 },
    /* 4 */ { "bits"    : 786, "bytes"   : 98 },
    /* 5 */ { "bits"    : 45, "bytes"   : 5 },
    /* 6 */ { "bits"    : 12, "bytes"   : 1 },
    /* 7 */ { "bits"    : 9, "bytes"   : 1 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^12 + x^11 + x^10 + x^9 + x^7 + x^5 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0x9ea3",
    "koopman"    : "0x4F51",
    "normal"     : "0x1ea3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32752, "bytes"   : 4094 },
    /* 4 */ { "bits"    : 361, "bytes"   : 45 },
    /* 5 */ { "bits"    : 48, "bytes"   : 6 },
    /* 6 */ { "bits"    : 10, "bytes"   : 1 },
    /* 7 */ { "bits"    : 5, "bytes"   : 0 },
    /* 8 */ { "bits"    : 5, "bytes"   : 0 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^13 + x^11 + x^8 + x^7 + x^5 + x^3 + x^2 + 1",
    "degree"     : 15,
    "explicit"   : "0xa9ad",
    "koopman"    : "0x54D6",
    "normal"     : "0x29ad"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32752, "bytes"   : 4094 },
    /* 4 */ { "bits"    : 54, "bytes"   : 6 },
    /* 5 */ { "bits"    : 47, "bytes"   : 5 },
    /* 6 */ { "bits"    : 10, "bytes"   : 1 },
    /* 7 */ { "bits"    : 8, "bytes"   : 1 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^13 + x^11 + x^10 + x^9 + x^6 + x^5 + x^4 + x^2 + 1",
    "degree"     : 15,
    "explicit"   : "0xae75",
    "koopman"    : "0x573A",
    "normal"     : "0x2e75"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 114, "bytes"   : 14 },
    /* 4 */ { "bits"    : 114, "bytes"   : 14 },
    /* 5 */ { "bits"    : 114, "bytes"   : 14 },
    /* 6 */ { "bits"    : 114, "bytes"   : 14 },
    /* 7 */ { "bits"    : 7, "bytes"   : 0 },
    /* 8 */ { "bits"    : 7, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^13 + x^11 + x^10 + x^9 + x^8 + x^7 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0xafcf",
    "koopman"    : "0x57E7",
    "normal"     : "0x2fcf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16368, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 16368, "bytes"   : 2046 },
    /* 5 */ { "bits"    : 45, "bytes"   : 5 },
    /* 6 */ { "bits"    : 45, "bytes"   : 5 },
    /* 7 */ { "bits"    : 12, "bytes"   : 1 },
    /* 8 */ { "bits"    : 12, "bytes"   : 1 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^13 + x^12 + x^10 + x^7 + x^3 + x^2 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0xb48f",
    "koopman"    : "0x5A47",
    "normal"     : "0x348f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 30690, "bytes"   : 3836 },
    /* 4 */ { "bits"    : 166, "bytes"   : 20 },
    /* 5 */ { "bits"    : 33, "bytes"   : 4 },
    /* 6 */ { "bits"    : 19, "bytes"   : 2 },
    /* 7 */ { "bits"    : 5, "bytes"   : 0 },
    /* 8 */ { "bits"    : 5, "bytes"   : 0 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^13 + x^12 + x^10 + x^9 + x^7 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0xb6af",
    "koopman"    : "0x5B57",
    "normal"     : "0x36af"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32752, "bytes"   : 4094 },
    /* 4 */ { "bits"    : 270, "bytes"   : 33 },
    /* 5 */ { "bits"    : 52, "bytes"   : 6 },
    /* 6 */ { "bits"    : 18, "bytes"   : 2 },
    /* 7 */ { "bits"    : 16, "bytes"   : 2 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^13 + x^12 + x^10 + x^9 + x^8 + x^7 + x^5 + x^3 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0xb7ab",
    "koopman"    : "0x5BD5",
    "normal"     : "0x37ab"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 440, "bytes"   : 55 },
    /* 4 */ { "bits"    : 180, "bytes"   : 22 },
    /* 5 */ { "bits"    : 35, "bytes"   : 4 },
    /* 6 */ { "bits"    : 16, "bytes"   : 2 },
    /* 7 */ { "bits"    : 16, "bytes"   : 2 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^13 + x^12 + x^11 + x^8 + x^7 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 15,
    "explicit"   : "0xb9bd",
    "koopman"    : "0x5CDE",
    "normal"     : "0x39bd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 10220, "bytes"   : 1277 },
    /* 4 */ { "bits"    : 10220, "bytes"   : 1277 },
    /* 5 */ { "bits"    : 65, "bytes"   : 8 },
    /* 6 */ { "bits"    : 9, "bytes"   : 1 },
    /* 7 */ { "bits"    : 5, "bytes"   : 0 },
    /* 8 */ { "bits"    : 5, "bytes"   : 0 },
    /* 9 */ { "bits"    : 4, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^13 + x^12 + x^11 + x^10 + x^9 + x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0xbfff",
    "koopman"    : "0x5FFF",
    "normal"     : "0x3fff"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32752, "bytes"   : 4094 },
    /* 4 */ { "bits"    : 703, "bytes"   : 87 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^14 + x^10 + x^8 + x^7 + x^4 + x^3 + 1",
    "degree"     : 15,
    "explicit"   : "0xc599",
    "koopman"    : "0x62CC",
    "normal"     : "0x4599"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 112, "bytes"   : 14 },
    /* 4 */ { "bits"    : 112, "bytes"   : 14 },
    /* 5 */ { "bits"    : 112, "bytes"   : 14 },
    /* 6 */ { "bits"    : 112, "bytes"   : 14 },
    /* 7 */ { "bits"    : 7, "bytes"   : 0 },
    /* 8 */ { "bits"    : 7, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^14 + x^10 + x^9 + x^4 + x^2 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0xc617",
    "koopman"    : "0x630B",
    "normal"     : "0x4617"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16368, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 16368, "bytes"   : 2046 },
    /* 5 */ { "bits"    : 13, "bytes"   : 1 },
    /* 6 */ { "bits"    : 13, "bytes"   : 1 },
    /* 7 */ { "bits"    : 12, "bytes"   : 1 },
    /* 8 */ { "bits"    : 12, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^14 + x^11 + x^10 + x^9 + x^8 + x^6 + x^3 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0xcf4b",
    "koopman"    : "0x67A5",
    "normal"     : "0x4f4b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16368, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 16368, "bytes"   : 2046 },
    /* 5 */ { "bits"    : 24, "bytes"   : 3 },
    /* 6 */ { "bits"    : 24, "bytes"   : 3 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^14 + x^12 + x^10 + x^8 + x^4 + x^3 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0xd51b",
    "koopman"    : "0x6A8D",
    "normal"     : "0x551b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 136, "bytes"   : 17 },
    /* 4 */ { "bits"    : 136, "bytes"   : 17 },
    /* 5 */ { "bits"    : 136, "bytes"   : 17 },
    /* 6 */ { "bits"    : 16, "bytes"   : 2 },
    /* 7 */ { "bits"    : 5, "bytes"   : 0 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^14 + x^13 + x^11 + x^4 + x^2 + 1",
    "degree"     : 15,
    "explicit"   : "0xe815",
    "koopman"    : "0x740A",
    "normal"     : "0x6815"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 48, "bytes"   : 6 },
    /* 4 */ { "bits"    : 48, "bytes"   : 6 },
    /* 5 */ { "bits"    : 48, "bytes"   : 6 },
    /* 6 */ { "bits"    : 13, "bytes"   : 1 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^15 + x^14 + x^13 + x^11 + x^10 + x^9 + x^8 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 15,
    "explicit"   : "0xef7f",
    "koopman"    : "0x77BF",
    "normal"     : "0x6f7f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16368, "bytes"   : 2046 },
    /* 4 */ { "bits"    : 16368, "bytes"   : 2046 },
    /* 5 */ { "bits"    : 39, "bytes"   : 4 },
    /* 6 */ { "bits"    : 39, "bytes"   : 4 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x10007",
    "koopman"    : "0x8003",
    "normal"     : "0x7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 4 */ { "bits"    : 32751, "bytes"   : 4093 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^5 + x^3 + x^2 + 1",
    "degree"     : 16,
    "explicit"   : "0x1002d",
    "koopman"    : "0x8016",
    "normal"     : "0x2d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65519, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 551, "bytes"   : 68 },
    /* 5 */ { "bits"    : 40, "bytes"   : 5 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^8 + x^4 + x^3 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1011b",
    "koopman"    : "0x808D",
    "normal"     : "0x11b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 28642, "bytes"   : 3580 },
    /* 4 */ { "bits"    : 28642, "bytes"   : 3580 },
    /* 5 */ { "bits"    : 99, "bytes"   : 12 },
    /* 6 */ { "bits"    : 99, "bytes"   : 12 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^10 + x^8 + x^7 + x^3 + 1",
    "degree"     : 16,
    "explicit"   : "0x10589",
    "koopman"    : "0x82C4",
    "normal"     : "0x589"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 238, "bytes"   : 29 },
    /* 4 */ { "bits"    : 238, "bytes"   : 29 },
    /* 5 */ { "bits"    : 112, "bytes"   : 14 },
    /* 6 */ { "bits"    : 112, "bytes"   : 14 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^11 + x^10 + x^8 + x^7 + x^6 + x^5 + x^2 + 1",
    "degree"     : 16,
    "explicit"   : "0x10de5",
    "koopman"    : "0x86F2",
    "normal"     : "0xde5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65519, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 83, "bytes"   : 10 },
    /* 5 */ { "bits"    : 53, "bytes"   : 6 },
    /* 6 */ { "bits"    : 40, "bytes"   : 5 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^12 + x^5 + 1",
    "degree"     : 16,
    "explicit"   : "0x11021",
    "koopman"    : "0x8810",
    "normal"     : "0x1021"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 4 */ { "bits"    : 32751, "bytes"   : 4093 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^12 + x^8 + x^7 + x^6 + x^5 + x^4 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x111f3",
    "koopman"    : "0x88F9",
    "normal"     : "0x11f3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65519, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 96, "bytes"   : 12 },
    /* 5 */ { "bits"    : 88, "bytes"   : 11 },
    /* 6 */ { "bits"    : 20, "bytes"   : 2 },
    /* 7 */ { "bits"    : 15, "bytes"   : 1 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^12 + x^11 + x^9 + x^8 + x^5 + x^3 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x11b2b",
    "koopman"    : "0x8D95",
    "normal"     : "0x1b2b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65519, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 1149, "bytes"   : 143 },
    /* 5 */ { "bits"    : 62, "bytes"   : 7 },
    /* 6 */ { "bits"    : 19, "bytes"   : 2 },
    /* 7 */ { "bits"    : 9, "bytes"   : 1 },
    /* 8 */ { "bits"    : 5, "bytes"   : 0 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^12 + x^11 + x^10 + x^8 + x^7 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x11dcf",
    "koopman"    : "0x8EE7",
    "normal"     : "0x1dcf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2743, "bytes"   : 342 },
    /* 4 */ { "bits"    : 2743, "bytes"   : 342 },
    /* 5 */ { "bits"    : 104, "bytes"   : 13 },
    /* 6 */ { "bits"    : 11, "bytes"   : 1 },
    /* 7 */ { "bits"    : 10, "bytes"   : 1 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^12 + x^11 + x^10 + x^9 + x^8 + x^7 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x11fb7",
    "koopman"    : "0x8FDB",
    "normal"     : "0x1fb7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 4 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 5 */ { "bits"    : 51, "bytes"   : 6 },
    /* 6 */ { "bits"    : 51, "bytes"   : 6 },
    /* 7 */ { "bits"    : 15, "bytes"   : 1 },
    /* 8 */ { "bits"    : 15, "bytes"   : 1 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^13 + x^10 + x^9 + x^7 + x^5 + x^4 + x^2 + 1",
    "degree"     : 16,
    "explicit"   : "0x126b5",
    "koopman"    : "0x935A",
    "normal"     : "0x26b5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 21467, "bytes"   : 2683 },
    /* 4 */ { "bits"    : 375, "bytes"   : 46 },
    /* 5 */ { "bits"    : 23, "bytes"   : 2 },
    /* 6 */ { "bits"    : 22, "bytes"   : 2 },
    /* 7 */ { "bits"    : 19, "bytes"   : 2 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^13 + x^11 + x^10 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x12c4f",
    "koopman"    : "0x9627",
    "normal"     : "0x2c4f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65519, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 390, "bytes"   : 48 },
    /* 5 */ { "bits"    : 119, "bytes"   : 14 },
    /* 6 */ { "bits"    : 15, "bytes"   : 1 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 },
    /* 9 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^13 + x^11 + x^10 + x^8 + x^4 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x12d17",
    "koopman"    : "0x968B",
    "normal"     : "0x2d17"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16367, "bytes"   : 2045 },
    /* 4 */ { "bits"    : 363, "bytes"   : 45 },
    /* 5 */ { "bits"    : 19, "bytes"   : 2 },
    /* 6 */ { "bits"    : 19, "bytes"   : 2 },
    /* 7 */ { "bits"    : 19, "bytes"   : 2 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 },
    /* 9 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^13 + x^11 + x^10 + x^9 + x^7 + x^3 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x12e8f",
    "koopman"    : "0x9747",
    "normal"     : "0x2e8f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32750, "bytes"   : 4093 },
    /* 4 */ { "bits"    : 32750, "bytes"   : 4093 },
    /* 5 */ { "bits"    : 78, "bytes"   : 9 },
    /* 6 */ { "bits"    : 78, "bytes"   : 9 },
    /* 7 */ { "bits"    : 9, "bytes"   : 1 },
    /* 8 */ { "bits"    : 9, "bytes"   : 1 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^13 + x^11 + x^10 + x^9 + x^8 + x^4 + x^2 + 1",
    "degree"     : 16,
    "explicit"   : "0x12f15",
    "koopman"    : "0x978A",
    "normal"     : "0x2f15"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 64881, "bytes"   : 8110 },
    /* 4 */ { "bits"    : 178, "bytes"   : 22 },
    /* 5 */ { "bits"    : 67, "bytes"   : 8 },
    /* 6 */ { "bits"    : 28, "bytes"   : 3 },
    /* 7 */ { "bits"    : 16, "bytes"   : 2 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^13 + x^11 + x^10 + x^9 + x^8 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 16,
    "explicit"   : "0x12f3d",
    "koopman"    : "0x979E",
    "normal"     : "0x2f3d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65519, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 462, "bytes"   : 57 },
    /* 5 */ { "bits"    : 33, "bytes"   : 4 },
    /* 6 */ { "bits"    : 13, "bytes"   : 1 },
    /* 7 */ { "bits"    : 13, "bytes"   : 1 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^13 + x^12 + x^11 + x^10 + x^8 + x^6 + x^5 + x^2 + 1",
    "degree"     : 16,
    "explicit"   : "0x13d65",
    "koopman"    : "0x9EB2",
    "normal"     : "0x3d65"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 135, "bytes"   : 16 },
    /* 4 */ { "bits"    : 135, "bytes"   : 16 },
    /* 5 */ { "bits"    : 135, "bytes"   : 16 },
    /* 6 */ { "bits"    : 135, "bytes"   : 16 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 4, "bytes"   : 0 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^14 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x14003",
    "koopman"    : "0xA001",
    "normal"     : "0x4003"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 4 */ { "bits"    : 32751, "bytes"   : 4093 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^14 + x^9 + x^4 + x^3 + x^2 + 1",
    "degree"     : 16,
    "explicit"   : "0x1421d",
    "koopman"    : "0xA10E",
    "normal"     : "0x421d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 19669, "bytes"   : 2458 },
    /* 4 */ { "bits"    : 19669, "bytes"   : 2458 },
    /* 5 */ { "bits"    : 87, "bytes"   : 10 },
    /* 6 */ { "bits"    : 28, "bytes"   : 3 },
    /* 7 */ { "bits"    : 9, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^14 + x^11 + x^10 + x^9 + x^7 + x^5 + x^3 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x14eab",
    "koopman"    : "0xA755",
    "normal"     : "0x4eab"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 238, "bytes"   : 29 },
    /* 4 */ { "bits"    : 238, "bytes"   : 29 },
    /* 5 */ { "bits"    : 112, "bytes"   : 14 },
    /* 6 */ { "bits"    : 112, "bytes"   : 14 },
    /* 7 */ { "bits"    : 9, "bytes"   : 1 },
    /* 8 */ { "bits"    : 9, "bytes"   : 1 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^14 + x^12 + x^11 + x^7 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x158df",
    "koopman"    : "0xAC6F",
    "normal"     : "0x58df"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65519, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 259, "bytes"   : 32 },
    /* 5 */ { "bits"    : 75, "bytes"   : 9 },
    /* 6 */ { "bits"    : 14, "bytes"   : 1 },
    /* 7 */ { "bits"    : 14, "bytes"   : 1 },
    /* 8 */ { "bits"    : 9, "bytes"   : 1 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^14 + x^12 + x^11 + x^8 + x^5 + x^4 + x^2 + 1",
    "degree"     : 16,
    "explicit"   : "0x15935",
    "koopman"    : "0xAC9A",
    "normal"     : "0x5935"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 241, "bytes"   : 30 },
    /* 4 */ { "bits"    : 241, "bytes"   : 30 },
    /* 5 */ { "bits"    : 241, "bytes"   : 30 },
    /* 6 */ { "bits"    : 35, "bytes"   : 4 },
    /* 7 */ { "bits"    : 10, "bytes"   : 1 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^14 + x^12 + x^11 + x^9 + x^8 + x^7 + x^4 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x15b93",
    "koopman"    : "0xADC9",
    "normal"     : "0x5b93"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 238, "bytes"   : 29 },
    /* 4 */ { "bits"    : 238, "bytes"   : 29 },
    /* 5 */ { "bits"    : 112, "bytes"   : 14 },
    /* 6 */ { "bits"    : 112, "bytes"   : 14 },
    /* 7 */ { "bits"    : 9, "bytes"   : 1 },
    /* 8 */ { "bits"    : 9, "bytes"   : 1 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^14 + x^13 + x^11 + x^9 + x^7 + x^6 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x16afb",
    "koopman"    : "0xB57D",
    "normal"     : "0x6afb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 4 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 5 */ { "bits"    : 27, "bytes"   : 3 },
    /* 6 */ { "bits"    : 27, "bytes"   : 3 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^14 + x^13 + x^11 + x^10 + x^9 + x^8 + x^6 + x^5 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x16f63",
    "koopman"    : "0xB7B1",
    "normal"     : "0x6f63"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 239, "bytes"   : 29 },
    /* 4 */ { "bits"    : 239, "bytes"   : 29 },
    /* 5 */ { "bits"    : 239, "bytes"   : 29 },
    /* 6 */ { "bits"    : 14, "bytes"   : 1 },
    /* 7 */ { "bits"    : 13, "bytes"   : 1 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^14 + x^13 + x^12 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1705b",
    "koopman"    : "0xB82D",
    "normal"     : "0x705b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65519, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 221, "bytes"   : 27 },
    /* 5 */ { "bits"    : 22, "bytes"   : 2 },
    /* 6 */ { "bits"    : 18, "bytes"   : 2 },
    /* 7 */ { "bits"    : 18, "bytes"   : 2 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^14 + x^13 + x^12 + x^10 + x^8 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1755b",
    "koopman"    : "0xBAAD",
    "normal"     : "0x755b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 7985, "bytes"   : 998 },
    /* 4 */ { "bits"    : 7985, "bytes"   : 998 },
    /* 5 */ { "bits"    : 108, "bytes"   : 13 },
    /* 6 */ { "bits"    : 20, "bytes"   : 2 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^2 + 1",
    "degree"     : 16,
    "explicit"   : "0x18005",
    "koopman"    : "0xC002",
    "normal"     : "0x8005"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 4 */ { "bits"    : 32751, "bytes"   : 4093 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^11 + x^8 + x^6 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1897b",
    "koopman"    : "0xC4BD",
    "normal"     : "0x897b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 4 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 5 */ { "bits"    : 43, "bytes"   : 5 },
    /* 6 */ { "bits"    : 43, "bytes"   : 5 },
    /* 7 */ { "bits"    : 4, "bytes"   : 0 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 },
    /* 9 */ { "bits"    : 4, "bytes"   : 0 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^11 + x^9 + x^8 + x^7 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x18bb7",
    "koopman"    : "0xC5DB",
    "normal"     : "0x8bb7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65519, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 353, "bytes"   : 44 },
    /* 5 */ { "bits"    : 47, "bytes"   : 5 },
    /* 6 */ { "bits"    : 23, "bytes"   : 2 },
    /* 7 */ { "bits"    : 8, "bytes"   : 1 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^11 + x^10 + x^9 + x^8 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x18f57",
    "koopman"    : "0xC7AB",
    "normal"     : "0x8f57"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65519, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 474, "bytes"   : 59 },
    /* 5 */ { "bits"    : 52, "bytes"   : 6 },
    /* 6 */ { "bits"    : 16, "bytes"   : 2 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^12 + x^7 + x^6 + x^4 + x^3 + 1",
    "degree"     : 16,
    "explicit"   : "0x190d9",
    "koopman"    : "0xC86C",
    "normal"     : "0x90d9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 135, "bytes"   : 16 },
    /* 4 */ { "bits"    : 135, "bytes"   : 16 },
    /* 5 */ { "bits"    : 135, "bytes"   : 16 },
    /* 6 */ { "bits"    : 135, "bytes"   : 16 },
    /* 7 */ { "bits"    : 5, "bytes"   : 0 },
    /* 8 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^12 + x^10 + x^9 + x^8 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x19757",
    "koopman"    : "0xCBAB",
    "normal"     : "0x9757"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 299, "bytes"   : 37 },
    /* 4 */ { "bits"    : 299, "bytes"   : 37 },
    /* 5 */ { "bits"    : 59, "bytes"   : 7 },
    /* 6 */ { "bits"    : 59, "bytes"   : 7 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 3, "bytes"   : 0 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^13 + x^5 + x^3 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1a02b",
    "koopman"    : "0xD015",
    "normal"     : "0xa02b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 5339, "bytes"   : 667 },
    /* 4 */ { "bits"    : 556, "bytes"   : 69 },
    /* 5 */ { "bits"    : 75, "bytes"   : 9 },
    /* 6 */ { "bits"    : 12, "bytes"   : 1 },
    /* 7 */ { "bits"    : 9, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^13 + x^7 + x^4 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1a097",
    "koopman"    : "0xD04B",
    "normal"     : "0xa097"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32750, "bytes"   : 4093 },
    /* 4 */ { "bits"    : 32750, "bytes"   : 4093 },
    /* 5 */ { "bits"    : 67, "bytes"   : 8 },
    /* 6 */ { "bits"    : 67, "bytes"   : 8 },
    /* 7 */ { "bits"    : 8, "bytes"   : 1 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^13 + x^9 + x^7 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1a2eb",
    "koopman"    : "0xD175",
    "normal"     : "0xa2eb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 4 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 5 */ { "bits"    : 93, "bytes"   : 11 },
    /* 6 */ { "bits"    : 93, "bytes"   : 11 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^13 + x^10 + x^9 + x^8 + x^7 + x^6 + x^4 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1a7d3",
    "koopman"    : "0xD3E9",
    "normal"     : "0xa7d3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 7985, "bytes"   : 998 },
    /* 4 */ { "bits"    : 7985, "bytes"   : 998 },
    /* 5 */ { "bits"    : 25, "bytes"   : 3 },
    /* 6 */ { "bits"    : 11, "bytes"   : 1 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 },
    /* 8 */ { "bits"    : 3, "bytes"   : 0 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^14 + x^11 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1c867",
    "koopman"    : "0xE433",
    "normal"     : "0xc867"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65519, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 361, "bytes"   : 45 },
    /* 5 */ { "bits"    : 44, "bytes"   : 5 },
    /* 6 */ { "bits"    : 11, "bytes"   : 1 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 },
    /* 8 */ { "bits"    : 5, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^14 + x^12 + x^9 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1d25f",
    "koopman"    : "0xE92F",
    "normal"     : "0xd25f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 89, "bytes"   : 11 },
    /* 4 */ { "bits"    : 9, "bytes"   : 1 },
    /* 5 */ { "bits"    : 9, "bytes"   : 1 },
    /* 6 */ { "bits"    : 9, "bytes"   : 1 },
    /* 7 */ { "bits"    : 9, "bytes"   : 1 },
    /* 8 */ { "bits"    : 9, "bytes"   : 1 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^14 + x^12 + x^11 + x^9 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1da5f",
    "koopman"    : "0xED2F",
    "normal"     : "0xda5f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 4 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 5 */ { "bits"    : 46, "bytes"   : 5 },
    /* 6 */ { "bits"    : 46, "bytes"   : 5 },
    /* 7 */ { "bits"    : 8, "bytes"   : 1 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^14 + x^12 + x^11 + x^10 + x^9 + x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1dfff",
    "koopman"    : "0xEFFF",
    "normal"     : "0xdfff"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 4 */ { "bits"    : 32751, "bytes"   : 4093 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^14 + x^13 + x^12 + x^9 + x^7 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1f29f",
    "koopman"    : "0xF94F",
    "normal"     : "0xf29f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 242, "bytes"   : 30 },
    /* 4 */ { "bits"    : 242, "bytes"   : 30 },
    /* 5 */ { "bits"    : 114, "bytes"   : 14 },
    /* 6 */ { "bits"    : 114, "bytes"   : 14 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^16 + x^15 + x^14 + x^13 + x^12 + x^11 + x^9 + x^8 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 16,
    "explicit"   : "0x1fb7f",
    "koopman"    : "0xFDBF",
    "normal"     : "0xfb7f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65519, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 647, "bytes"   : 80 },
    /* 5 */ { "bits"    : 34, "bytes"   : 4 },
    /* 6 */ { "bits"    : 34, "bytes"   : 4 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^3 + 1",
    "degree"     : 17,
    "explicit"   : "0x20009",
    "koopman"    : "0x10004",
    "normal"     : "0x9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 131054, "bytes"   : 16381 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x20037",
    "koopman"    : "0x1001B",
    "normal"     : "0x37"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65518, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 65518, "bytes"   : 8189 },
    /* 5 */ { "bits"    : 52, "bytes"   : 6 },
    /* 6 */ { "bits"    : 52, "bytes"   : 6 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^7 + x^5 + x^3 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x200ab",
    "koopman"    : "0x10055",
    "normal"     : "0xab"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 364, "bytes"   : 45 },
    /* 4 */ { "bits"    : 364, "bytes"   : 45 },
    /* 5 */ { "bits"    : 113, "bytes"   : 14 },
    /* 6 */ { "bits"    : 113, "bytes"   : 14 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^12 + x^11 + x^6 + x^4 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x21853",
    "koopman"    : "0x10C29",
    "normal"     : "0x1853"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 131054, "bytes"   : 16381 },
    /* 4 */ { "bits"    : 358, "bytes"   : 44 },
    /* 5 */ { "bits"    : 55, "bytes"   : 6 },
    /* 6 */ { "bits"    : 28, "bytes"   : 3 },
    /* 7 */ { "bits"    : 26, "bytes"   : 3 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^13 + x^11 + x^10 + x^7 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x22cbb",
    "koopman"    : "0x1165D",
    "normal"     : "0x2cbb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65518, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 65518, "bytes"   : 8189 },
    /* 5 */ { "bits"    : 118, "bytes"   : 14 },
    /* 6 */ { "bits"    : 118, "bytes"   : 14 },
    /* 7 */ { "bits"    : 10, "bytes"   : 1 },
    /* 8 */ { "bits"    : 10, "bytes"   : 1 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^13 + x^12 + x^10 + x^9 + x^8 + x^7 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x237eb",
    "koopman"    : "0x11BF5",
    "normal"     : "0x37eb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 238, "bytes"   : 29 },
    /* 4 */ { "bits"    : 238, "bytes"   : 29 },
    /* 5 */ { "bits"    : 28, "bytes"   : 3 },
    /* 6 */ { "bits"    : 28, "bytes"   : 3 },
    /* 7 */ { "bits"    : 22, "bytes"   : 2 },
    /* 8 */ { "bits"    : 22, "bytes"   : 2 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^14 + x^10 + x^9 + x^8 + x^6 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x2477b",
    "koopman"    : "0x123BD",
    "normal"     : "0x477b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 131054, "bytes"   : 16381 },
    /* 4 */ { "bits"    : 8, "bytes"   : 1 },
    /* 5 */ { "bits"    : 8, "bytes"   : 1 },
    /* 6 */ { "bits"    : 8, "bytes"   : 1 },
    /* 7 */ { "bits"    : 8, "bytes"   : 1 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 },
    /* 9 */ { "bits"    : 8, "bytes"   : 1 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^15 + x^13 + x^11 + x^9 + x^8 + x^2 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x2ab07",
    "koopman"    : "0x15583",
    "normal"     : "0xab07"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 131054, "bytes"   : 16381 },
    /* 4 */ { "bits"    : 722, "bytes"   : 90 },
    /* 5 */ { "bits"    : 122, "bytes"   : 15 },
    /* 6 */ { "bits"    : 15, "bytes"   : 1 },
    /* 7 */ { "bits"    : 15, "bytes"   : 1 },
    /* 8 */ { "bits"    : 15, "bytes"   : 1 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^15 + x^14 + x^12 + x^11 + x^10 + x^9 + x^8 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x2df4f",
    "koopman"    : "0x16FA7",
    "normal"     : "0xdf4f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 131054, "bytes"   : 16381 },
    /* 4 */ { "bits"    : 1976, "bytes"   : 247 },
    /* 5 */ { "bits"    : 63, "bytes"   : 7 },
    /* 6 */ { "bits"    : 16, "bytes"   : 2 },
    /* 7 */ { "bits"    : 16, "bytes"   : 2 },
    /* 8 */ { "bits"    : 10, "bytes"   : 1 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^15 + x^14 + x^13 + x^10 + x^7 + x^4 + x^3 + x^2 + 1",
    "degree"     : 17,
    "explicit"   : "0x2e49d",
    "koopman"    : "0x1724E",
    "normal"     : "0xe49d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 240, "bytes"   : 30 },
    /* 4 */ { "bits"    : 240, "bytes"   : 30 },
    /* 5 */ { "bits"    : 240, "bytes"   : 30 },
    /* 6 */ { "bits"    : 240, "bytes"   : 30 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^15 + x^14 + x^13 + x^11 + x^9 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x2ea37",
    "koopman"    : "0x1751B",
    "normal"     : "0xea37"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 46, "bytes"   : 5 },
    /* 4 */ { "bits"    : 46, "bytes"   : 5 },
    /* 5 */ { "bits"    : 46, "bytes"   : 5 },
    /* 6 */ { "bits"    : 46, "bytes"   : 5 },
    /* 7 */ { "bits"    : 46, "bytes"   : 5 },
    /* 8 */ { "bits"    : 5, "bytes"   : 0 },
    /* 9 */ { "bits"    : 4, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^15 + x^14 + x^13 + x^11 + x^10 + x^8 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x2ed4f",
    "koopman"    : "0x176A7",
    "normal"     : "0xed4f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 12937, "bytes"   : 1617 },
    /* 4 */ { "bits"    : 12937, "bytes"   : 1617 },
    /* 5 */ { "bits"    : 6, "bytes"   : 0 },
    /* 6 */ { "bits"    : 6, "bytes"   : 0 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^16 + x^13 + x^12 + x^11 + x^9 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x33a2f",
    "koopman"    : "0x19D17",
    "normal"     : "0x13a2f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 131054, "bytes"   : 16381 },
    /* 4 */ { "bits"    : 824, "bytes"   : 103 },
    /* 5 */ { "bits"    : 17, "bytes"   : 2 },
    /* 6 */ { "bits"    : 17, "bytes"   : 2 },
    /* 7 */ { "bits"    : 10, "bytes"   : 1 },
    /* 8 */ { "bits"    : 10, "bytes"   : 1 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^16 + x^13 + x^12 + x^11 + x^10 + x^9 + x^7 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x33eaf",
    "koopman"    : "0x19F57",
    "normal"     : "0x13eaf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 131054, "bytes"   : 16381 },
    /* 4 */ { "bits"    : 420, "bytes"   : 52 },
    /* 5 */ { "bits"    : 70, "bytes"   : 8 },
    /* 6 */ { "bits"    : 59, "bytes"   : 7 },
    /* 7 */ { "bits"    : 7, "bytes"   : 0 },
    /* 8 */ { "bits"    : 7, "bytes"   : 0 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^16 + x^14 + x^13 + x^11 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x3685b",
    "koopman"    : "0x1B42D",
    "normal"     : "0x1685b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 238, "bytes"   : 29 },
    /* 4 */ { "bits"    : 238, "bytes"   : 29 },
    /* 5 */ { "bits"    : 238, "bytes"   : 29 },
    /* 6 */ { "bits"    : 238, "bytes"   : 29 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^17 + x^16 + x^14 + x^13 + x^12 + x^7 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 17,
    "explicit"   : "0x370b7",
    "koopman"    : "0x1B85B",
    "normal"     : "0x170b7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 131054, "bytes"   : 16381 },
    /* 4 */ { "bits"    : 440, "bytes"   : 55 },
    /* 5 */ { "bits"    : 164, "bytes"   : 20 },
    /* 6 */ { "bits"    : 23, "bytes"   : 2 },
    /* 7 */ { "bits"    : 5, "bytes"   : 0 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^5 + x^2 + x^1 + 1",
    "degree"     : 18,
    "explicit"   : "0x40027",
    "koopman"    : "0x20013",
    "normal"     : "0x27"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 262125, "bytes"   : 32765 },
    /* 4 */ { "bits"    : 1329, "bytes"   : 166 },
    /* 5 */ { "bits"    : 82, "bytes"   : 10 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^5 + x^4 + 1",
    "degree"     : 18,
    "explicit"   : "0x40031",
    "koopman"    : "0x20018",
    "normal"     : "0x31"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 131053, "bytes"   : 16381 },
    /* 4 */ { "bits"    : 131053, "bytes"   : 16381 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^8 + x^7 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 18,
    "explicit"   : "0x401cf",
    "koopman"    : "0x200E7",
    "normal"     : "0x1cf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4077, "bytes"   : 509 },
    /* 4 */ { "bits"    : 4077, "bytes"   : 509 },
    /* 5 */ { "bits"    : 141, "bytes"   : 17 },
    /* 6 */ { "bits"    : 141, "bytes"   : 17 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^13 + x^12 + x^10 + x^9 + x^8 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 18,
    "explicit"   : "0x43757",
    "koopman"    : "0x21BAB",
    "normal"     : "0x3757"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 262125, "bytes"   : 32765 },
    /* 4 */ { "bits"    : 936, "bytes"   : 117 },
    /* 5 */ { "bits"    : 75, "bytes"   : 9 },
    /* 6 */ { "bits"    : 43, "bytes"   : 5 },
    /* 7 */ { "bits"    : 31, "bytes"   : 3 },
    /* 8 */ { "bits"    : 9, "bytes"   : 1 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^14 + x^13 + x^12 + x^8 + x^6 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 18,
    "explicit"   : "0x4717d",
    "koopman"    : "0x238BE",
    "normal"     : "0x717d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 262125, "bytes"   : 32765 },
    /* 4 */ { "bits"    : 1081, "bytes"   : 135 },
    /* 5 */ { "bits"    : 142, "bytes"   : 17 },
    /* 6 */ { "bits"    : 34, "bytes"   : 4 },
    /* 7 */ { "bits"    : 19, "bytes"   : 2 },
    /* 8 */ { "bits"    : 16, "bytes"   : 2 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^14 + x^13 + x^12 + x^9 + x^7 + x^6 + x^5 + x^4 + x^1 + 1",
    "degree"     : 18,
    "explicit"   : "0x472f3",
    "koopman"    : "0x23979",
    "normal"     : "0x72f3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 262125, "bytes"   : 32765 },
    /* 4 */ { "bits"    : 2807, "bytes"   : 350 },
    /* 5 */ { "bits"    : 85, "bytes"   : 10 },
    /* 6 */ { "bits"    : 9, "bytes"   : 1 },
    /* 7 */ { "bits"    : 9, "bytes"   : 1 },
    /* 8 */ { "bits"    : 9, "bytes"   : 1 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^15 + x^13 + x^12 + x^11 + x^10 + x^9 + x^7 + x^5 + x^2 + x^1 + 1",
    "degree"     : 18,
    "explicit"   : "0x4bea7",
    "koopman"    : "0x25F53",
    "normal"     : "0xbea7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 131053, "bytes"   : 16381 },
    /* 4 */ { "bits"    : 131053, "bytes"   : 16381 },
    /* 5 */ { "bits"    : 167, "bytes"   : 20 },
    /* 6 */ { "bits"    : 167, "bytes"   : 20 },
    /* 7 */ { "bits"    : 10, "bytes"   : 1 },
    /* 8 */ { "bits"    : 10, "bytes"   : 1 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^15 + x^13 + x^12 + x^11 + x^10 + x^9 + x^7 + x^6 + x^4 + x^2 + 1",
    "degree"     : 18,
    "explicit"   : "0x4bed5",
    "koopman"    : "0x25F6A",
    "normal"     : "0xbed5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 45, "bytes"   : 5 },
    /* 4 */ { "bits"    : 45, "bytes"   : 5 },
    /* 5 */ { "bits"    : 45, "bytes"   : 5 },
    /* 6 */ { "bits"    : 45, "bytes"   : 5 },
    /* 7 */ { "bits"    : 45, "bytes"   : 5 },
    /* 8 */ { "bits"    : 45, "bytes"   : 5 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^15 + x^14 + x^12 + x^10 + x^6 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 18,
    "explicit"   : "0x4d47b",
    "koopman"    : "0x26A3D",
    "normal"     : "0xd47b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 262125, "bytes"   : 32765 },
    /* 4 */ { "bits"    : 417, "bytes"   : 52 },
    /* 5 */ { "bits"    : 109, "bytes"   : 13 },
    /* 6 */ { "bits"    : 9, "bytes"   : 1 },
    /* 7 */ { "bits"    : 5, "bytes"   : 0 },
    /* 8 */ { "bits"    : 5, "bytes"   : 0 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^15 + x^14 + x^13 + x^12 + x^10 + x^9 + x^8 + x^6 + x^5 + x^4 + x^3 + 1",
    "degree"     : 18,
    "explicit"   : "0x4f779",
    "koopman"    : "0x27BBC",
    "normal"     : "0xf779"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 744, "bytes"   : 93 },
    /* 4 */ { "bits"    : 744, "bytes"   : 93 },
    /* 5 */ { "bits"    : 115, "bytes"   : 14 },
    /* 6 */ { "bits"    : 37, "bytes"   : 4 },
    /* 7 */ { "bits"    : 12, "bytes"   : 1 },
    /* 8 */ { "bits"    : 12, "bytes"   : 1 },
    /* 9 */ { "bits"    : 11, "bytes"   : 1 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^16 + x^11 + x^10 + x^9 + x^8 + x^6 + x^5 + x^4 + x^1 + 1",
    "degree"     : 18,
    "explicit"   : "0x50f73",
    "koopman"    : "0x287B9",
    "normal"     : "0x10f73"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 262125, "bytes"   : 32765 },
    /* 4 */ { "bits"    : 59, "bytes"   : 7 },
    /* 5 */ { "bits"    : 59, "bytes"   : 7 },
    /* 6 */ { "bits"    : 53, "bytes"   : 6 },
    /* 7 */ { "bits"    : 7, "bytes"   : 0 },
    /* 8 */ { "bits"    : 7, "bytes"   : 0 },
    /* 9 */ { "bits"    : 7, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^16 + x^14 + x^13 + x^12 + x^11 + x^10 + x^8 + x^7 + x^5 + x^3 + x^2 + 1",
    "degree"     : 18,
    "explicit"   : "0x57dad",
    "koopman"    : "0x2BED6",
    "normal"     : "0x17dad"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 262125, "bytes"   : 32765 },
    /* 4 */ { "bits"    : 781, "bytes"   : 97 },
    /* 5 */ { "bits"    : 207, "bytes"   : 25 },
    /* 6 */ { "bits"    : 10, "bytes"   : 1 },
    /* 7 */ { "bits"    : 10, "bytes"   : 1 },
    /* 8 */ { "bits"    : 5, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^16 + x^15 + x^13 + x^8 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 18,
    "explicit"   : "0x5a13f",
    "koopman"    : "0x2D09F",
    "normal"     : "0x1a13f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 262125, "bytes"   : 32765 },
    /* 4 */ { "bits"    : 994, "bytes"   : 124 },
    /* 5 */ { "bits"    : 104, "bytes"   : 13 },
    /* 6 */ { "bits"    : 12, "bytes"   : 1 },
    /* 7 */ { "bits"    : 12, "bytes"   : 1 },
    /* 8 */ { "bits"    : 12, "bytes"   : 1 },
    /* 9 */ { "bits"    : 10, "bytes"   : 1 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^16 + x^15 + x^14 + x^11 + x^10 + x^9 + x^8 + x^7 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 18,
    "explicit"   : "0x5cfbd",
    "koopman"    : "0x2E7DE",
    "normal"     : "0x1cfbd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 63346, "bytes"   : 7918 },
    /* 4 */ { "bits"    : 63346, "bytes"   : 7918 },
    /* 5 */ { "bits"    : 79, "bytes"   : 9 },
    /* 6 */ { "bits"    : 79, "bytes"   : 9 },
    /* 7 */ { "bits"    : 8, "bytes"   : 1 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 },
    /* 9 */ { "bits"    : 8, "bytes"   : 1 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^16 + x^15 + x^14 + x^12 + x^11 + x^10 + x^7 + x^4 + x^1 + 1",
    "degree"     : 18,
    "explicit"   : "0x5dc93",
    "koopman"    : "0x2EE49",
    "normal"     : "0x1dc93"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 262125, "bytes"   : 32765 },
    /* 4 */ { "bits"    : 635, "bytes"   : 79 },
    /* 5 */ { "bits"    : 93, "bytes"   : 11 },
    /* 6 */ { "bits"    : 69, "bytes"   : 8 },
    /* 7 */ { "bits"    : 10, "bytes"   : 1 },
    /* 8 */ { "bits"    : 3, "bytes"   : 0 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 },
    /* 11 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^17 + x^14 + x^12 + x^11 + x^7 + x^6 + x^4 + x^1 + 1",
    "degree"     : 18,
    "explicit"   : "0x658d3",
    "koopman"    : "0x32C69",
    "normal"     : "0x258d3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 496, "bytes"   : 62 },
    /* 4 */ { "bits"    : 496, "bytes"   : 62 },
    /* 5 */ { "bits"    : 240, "bytes"   : 30 },
    /* 6 */ { "bits"    : 240, "bytes"   : 30 },
    /* 7 */ { "bits"    : 20, "bytes"   : 2 },
    /* 8 */ { "bits"    : 20, "bytes"   : 2 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^18 + x^17 + x^16 + x^13 + x^11 + x^9 + x^7 + x^5 + x^2 + x^1 + 1",
    "degree"     : 18,
    "explicit"   : "0x72aa7",
    "koopman"    : "0x39553",
    "normal"     : "0x32aa7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 493, "bytes"   : 61 },
    /* 4 */ { "bits"    : 493, "bytes"   : 61 },
    /* 5 */ { "bits"    : 493, "bytes"   : 61 },
    /* 6 */ { "bits"    : 61, "bytes"   : 7 },
    /* 7 */ { "bits"    : 4, "bytes"   : 0 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^5 + x^2 + x^1 + 1",
    "degree"     : 19,
    "explicit"   : "0x80027",
    "koopman"    : "0x40013",
    "normal"     : "0x27"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 524268, "bytes"   : 65533 },
    /* 4 */ { "bits"    : 401, "bytes"   : 50 },
    /* 5 */ { "bits"    : 51, "bytes"   : 6 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^5 + x^3 + 1",
    "degree"     : 19,
    "explicit"   : "0x80029",
    "koopman"    : "0x40014",
    "normal"     : "0x29"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 262124, "bytes"   : 32765 },
    /* 4 */ { "bits"    : 262124, "bytes"   : 32765 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^8 + x^7 + x^6 + x^5 + 1",
    "degree"     : 19,
    "explicit"   : "0x801e1",
    "koopman"    : "0x400F0",
    "normal"     : "0x1e1"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 236, "bytes"   : 29 },
    /* 4 */ { "bits"    : 236, "bytes"   : 29 },
    /* 5 */ { "bits"    : 236, "bytes"   : 29 },
    /* 6 */ { "bits"    : 236, "bytes"   : 29 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^12 + x^9 + x^8 + x^6 + x^5 + x^4 + x^2 + 1",
    "degree"     : 19,
    "explicit"   : "0x81375",
    "koopman"    : "0x409BA",
    "normal"     : "0x1375"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 524268, "bytes"   : 65533 },
    /* 4 */ { "bits"    : 1170, "bytes"   : 146 },
    /* 5 */ { "bits"    : 295, "bytes"   : 36 },
    /* 6 */ { "bits"    : 51, "bytes"   : 6 },
    /* 7 */ { "bits"    : 25, "bytes"   : 3 },
    /* 8 */ { "bits"    : 5, "bytes"   : 0 },
    /* 9 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^15 + x^12 + x^11 + x^10 + x^9 + x^7 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 19,
    "explicit"   : "0x89eeb",
    "koopman"    : "0x44F75",
    "normal"     : "0x9eeb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 3047, "bytes"   : 380 },
    /* 4 */ { "bits"    : 3047, "bytes"   : 380 },
    /* 5 */ { "bits"    : 35, "bytes"   : 4 },
    /* 6 */ { "bits"    : 35, "bytes"   : 4 },
    /* 7 */ { "bits"    : 14, "bytes"   : 1 },
    /* 8 */ { "bits"    : 14, "bytes"   : 1 },
    /* 9 */ { "bits"    : 10, "bytes"   : 1 },
    /* 10 */ { "bits"    : 10, "bytes"   : 1 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^15 + x^13 + x^12 + x^11 + x^10 + x^9 + x^5 + x^4 + x^3 + 1",
    "degree"     : 19,
    "explicit"   : "0x8be39",
    "koopman"    : "0x45F1C",
    "normal"     : "0xbe39"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 524268, "bytes"   : 65533 },
    /* 4 */ { "bits"    : 975, "bytes"   : 121 },
    /* 5 */ { "bits"    : 182, "bytes"   : 22 },
    /* 6 */ { "bits"    : 18, "bytes"   : 2 },
    /* 7 */ { "bits"    : 10, "bytes"   : 1 },
    /* 8 */ { "bits"    : 9, "bytes"   : 1 },
    /* 9 */ { "bits"    : 9, "bytes"   : 1 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^16 + x^8 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 19,
    "explicit"   : "0x9013f",
    "koopman"    : "0x4809F",
    "normal"     : "0x1013f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 524268, "bytes"   : 65533 },
    /* 4 */ { "bits"    : 1207, "bytes"   : 150 },
    /* 5 */ { "bits"    : 174, "bytes"   : 21 },
    /* 6 */ { "bits"    : 48, "bytes"   : 6 },
    /* 7 */ { "bits"    : 31, "bytes"   : 3 },
    /* 8 */ { "bits"    : 20, "bytes"   : 2 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^16 + x^14 + x^13 + x^12 + x^10 + x^8 + x^7 + x^4 + x^3 + 1",
    "degree"     : 19,
    "explicit"   : "0x97599",
    "koopman"    : "0x4BACC",
    "normal"     : "0x17599"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 524268, "bytes"   : 65533 },
    /* 4 */ { "bits"    : 373, "bytes"   : 46 },
    /* 5 */ { "bits"    : 98, "bytes"   : 12 },
    /* 6 */ { "bits"    : 88, "bytes"   : 11 },
    /* 7 */ { "bits"    : 23, "bytes"   : 2 },
    /* 8 */ { "bits"    : 12, "bytes"   : 1 },
    /* 9 */ { "bits"    : 10, "bytes"   : 1 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 },
    /* 11 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^16 + x^15 + x^14 + x^13 + x^11 + x^10 + x^8 + x^6 + x^2 + 1",
    "degree"     : 19,
    "explicit"   : "0x9ed45",
    "koopman"    : "0x4F6A2",
    "normal"     : "0x1ed45"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 524268, "bytes"   : 65533 },
    /* 4 */ { "bits"    : 596, "bytes"   : 74 },
    /* 5 */ { "bits"    : 88, "bytes"   : 11 },
    /* 6 */ { "bits"    : 41, "bytes"   : 5 },
    /* 7 */ { "bits"    : 40, "bytes"   : 5 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 },
    /* 9 */ { "bits"    : 4, "bytes"   : 0 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^17 + x^12 + x^10 + x^9 + x^7 + x^4 + x^1 + 1",
    "degree"     : 19,
    "explicit"   : "0xa1693",
    "koopman"    : "0x50B49",
    "normal"     : "0x21693"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 107, "bytes"   : 13 },
    /* 4 */ { "bits"    : 107, "bytes"   : 13 },
    /* 5 */ { "bits"    : 47, "bytes"   : 5 },
    /* 6 */ { "bits"    : 47, "bytes"   : 5 },
    /* 7 */ { "bits"    : 46, "bytes"   : 5 },
    /* 8 */ { "bits"    : 5, "bytes"   : 0 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^17 + x^13 + x^12 + x^11 + x^9 + x^7 + x^6 + x^5 + x^4 + x^1 + 1",
    "degree"     : 19,
    "explicit"   : "0xa3af3",
    "koopman"    : "0x51D79",
    "normal"     : "0x23af3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 30641, "bytes"   : 3830 },
    /* 4 */ { "bits"    : 30641, "bytes"   : 3830 },
    /* 5 */ { "bits"    : 143, "bytes"   : 17 },
    /* 6 */ { "bits"    : 143, "bytes"   : 17 },
    /* 7 */ { "bits"    : 28, "bytes"   : 3 },
    /* 8 */ { "bits"    : 28, "bytes"   : 3 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^17 + x^15 + x^14 + x^12 + x^7 + x^5 + x^4 + x^2 + 1",
    "degree"     : 19,
    "explicit"   : "0xad0b5",
    "koopman"    : "0x5685A",
    "normal"     : "0x2d0b5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 494, "bytes"   : 61 },
    /* 4 */ { "bits"    : 494, "bytes"   : 61 },
    /* 5 */ { "bits"    : 494, "bytes"   : 61 },
    /* 6 */ { "bits"    : 494, "bytes"   : 61 },
    /* 7 */ { "bits"    : 16, "bytes"   : 2 },
    /* 8 */ { "bits"    : 16, "bytes"   : 2 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^18 + x^16 + x^15 + x^13 + x^9 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 19,
    "explicit"   : "0xda267",
    "koopman"    : "0x6D133",
    "normal"     : "0x5a267"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 524268, "bytes"   : 65533 },
    /* 4 */ { "bits"    : 1061, "bytes"   : 132 },
    /* 5 */ { "bits"    : 121, "bytes"   : 15 },
    /* 6 */ { "bits"    : 40, "bytes"   : 5 },
    /* 7 */ { "bits"    : 23, "bytes"   : 2 },
    /* 8 */ { "bits"    : 7, "bytes"   : 0 },
    /* 9 */ { "bits"    : 7, "bytes"   : 0 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^18 + x^16 + x^15 + x^14 + x^13 + x^12 + x^10 + x^9 + x^7 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 19,
    "explicit"   : "0xdf6af",
    "koopman"    : "0x6FB57",
    "normal"     : "0x5f6af"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 524268, "bytes"   : 65533 },
    /* 4 */ { "bits"    : 4165, "bytes"   : 520 },
    /* 5 */ { "bits"    : 44, "bytes"   : 5 },
    /* 6 */ { "bits"    : 44, "bytes"   : 5 },
    /* 7 */ { "bits"    : 20, "bytes"   : 2 },
    /* 8 */ { "bits"    : 10, "bytes"   : 1 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^18 + x^17 + x^15 + x^13 + x^11 + x^10 + x^9 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 19,
    "explicit"   : "0xeae7f",
    "koopman"    : "0x7573F",
    "normal"     : "0x6ae7f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 524268, "bytes"   : 65533 },
    /* 4 */ { "bits"    : 838, "bytes"   : 104 },
    /* 5 */ { "bits"    : 187, "bytes"   : 23 },
    /* 6 */ { "bits"    : 49, "bytes"   : 6 },
    /* 7 */ { "bits"    : 30, "bytes"   : 3 },
    /* 8 */ { "bits"    : 15, "bytes"   : 1 },
    /* 9 */ { "bits"    : 13, "bytes"   : 1 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^18 + x^17 + x^15 + x^14 + x^13 + x^12 + x^9 + x^8 + x^7 + x^3 + x^2 + x^1 + 1",
    "degree"     : 19,
    "explicit"   : "0xef38f",
    "koopman"    : "0x779C7",
    "normal"     : "0x6f38f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 107, "bytes"   : 13 },
    /* 4 */ { "bits"    : 107, "bytes"   : 13 },
    /* 5 */ { "bits"    : 45, "bytes"   : 5 },
    /* 6 */ { "bits"    : 45, "bytes"   : 5 },
    /* 7 */ { "bits"    : 45, "bytes"   : 5 },
    /* 8 */ { "bits"    : 45, "bytes"   : 5 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^19 + x^18 + x^17 + x^15 + x^14 + x^13 + x^12 + x^10 + x^9 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 19,
    "explicit"   : "0xef61f",
    "koopman"    : "0x77B0F",
    "normal"     : "0x6f61f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 262124, "bytes"   : 32765 },
    /* 4 */ { "bits"    : 262124, "bytes"   : 32765 },
    /* 5 */ { "bits"    : 206, "bytes"   : 25 },
    /* 6 */ { "bits"    : 206, "bytes"   : 25 },
    /* 7 */ { "bits"    : 15, "bytes"   : 1 },
    /* 8 */ { "bits"    : 15, "bytes"   : 1 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^3 + 1",
    "degree"     : 20,
    "explicit"   : "0x100009",
    "koopman"    : "0x80004",
    "normal"     : "0x9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1048555, "bytes"   : 131069 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^6 + x^5 + x^4 + x^2 + 1",
    "degree"     : 20,
    "explicit"   : "0x100075",
    "koopman"    : "0x8003A",
    "normal"     : "0x75"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 524267, "bytes"   : 65533 },
    /* 4 */ { "bits"    : 524267, "bytes"   : 65533 },
    /* 5 */ { "bits"    : 74, "bytes"   : 9 },
    /* 6 */ { "bits"    : 74, "bytes"   : 9 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^7 + x^6 + x^5 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x1000e3",
    "koopman"    : "0x80071",
    "normal"     : "0xe3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 393193, "bytes"   : 49149 },
    /* 4 */ { "bits"    : 393193, "bytes"   : 49149 },
    /* 5 */ { "bits"    : 229, "bytes"   : 28 },
    /* 6 */ { "bits"    : 229, "bytes"   : 28 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^16 + x^9 + x^4 + x^3 + x^2 + 1",
    "degree"     : 20,
    "explicit"   : "0x11021d",
    "koopman"    : "0x8810E",
    "normal"     : "0x1021d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65515, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 1685, "bytes"   : 210 },
    /* 5 */ { "bits"    : 176, "bytes"   : 22 },
    /* 6 */ { "bits"    : 66, "bytes"   : 8 },
    /* 7 */ { "bits"    : 49, "bytes"   : 6 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^16 + x^15 + x^13 + x^10 + x^9 + x^8 + x^7 + x^4 + x^3 + 1",
    "degree"     : 20,
    "explicit"   : "0x11a799",
    "koopman"    : "0x8D3CC",
    "normal"     : "0x1a799"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 11, "bytes"   : 1 },
    /* 4 */ { "bits"    : 11, "bytes"   : 1 },
    /* 5 */ { "bits"    : 11, "bytes"   : 1 },
    /* 6 */ { "bits"    : 11, "bytes"   : 1 },
    /* 7 */ { "bits"    : 11, "bytes"   : 1 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 },
    /* 9 */ { "bits"    : 11, "bytes"   : 1 },
    /* 10 */ { "bits"    : 11, "bytes"   : 1 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^17 + x^16 + x^15 + x^13 + x^11 + x^9 + x^8 + x^3 + x^2 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x13ab0f",
    "koopman"    : "0x9D587",
    "normal"     : "0x3ab0f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 64877, "bytes"   : 8109 },
    /* 4 */ { "bits"    : 64877, "bytes"   : 8109 },
    /* 5 */ { "bits"    : 118, "bytes"   : 14 },
    /* 6 */ { "bits"    : 118, "bytes"   : 14 },
    /* 7 */ { "bits"    : 13, "bytes"   : 1 },
    /* 8 */ { "bits"    : 13, "bytes"   : 1 },
    /* 9 */ { "bits"    : 8, "bytes"   : 1 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^18 + x^16 + x^12 + x^8 + x^7 + x^4 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x151193",
    "koopman"    : "0xA88C9",
    "normal"     : "0x51193"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1048555, "bytes"   : 131069 },
    /* 4 */ { "bits"    : 285, "bytes"   : 35 },
    /* 5 */ { "bits"    : 146, "bytes"   : 18 },
    /* 6 */ { "bits"    : 68, "bytes"   : 8 },
    /* 7 */ { "bits"    : 48, "bytes"   : 6 },
    /* 8 */ { "bits"    : 16, "bytes"   : 2 },
    /* 9 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^18 + x^16 + x^15 + x^14 + x^13 + x^11 + x^9 + x^7 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x15eadf",
    "koopman"    : "0xAF56F",
    "normal"     : "0x5eadf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1048555, "bytes"   : 131069 },
    /* 4 */ { "bits"    : 1080, "bytes"   : 135 },
    /* 5 */ { "bits"    : 371, "bytes"   : 46 },
    /* 6 */ { "bits"    : 51, "bytes"   : 6 },
    /* 7 */ { "bits"    : 27, "bytes"   : 3 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^18 + x^16 + x^15 + x^14 + x^13 + x^12 + x^11 + x^8 + x^7 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x15f9b7",
    "koopman"    : "0xAFCDB",
    "normal"     : "0x5f9b7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1048555, "bytes"   : 131069 },
    /* 4 */ { "bits"    : 429, "bytes"   : 53 },
    /* 5 */ { "bits"    : 85, "bytes"   : 10 },
    /* 6 */ { "bits"    : 29, "bytes"   : 3 },
    /* 7 */ { "bits"    : 12, "bytes"   : 1 },
    /* 8 */ { "bits"    : 12, "bytes"   : 1 },
    /* 9 */ { "bits"    : 8, "bytes"   : 1 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^18 + x^17 + x^15 + x^11 + x^10 + x^8 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x168d6f",
    "koopman"    : "0xB46B7",
    "normal"     : "0x68d6f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1048555, "bytes"   : 131069 },
    /* 4 */ { "bits"    : 2629, "bytes"   : 328 },
    /* 5 */ { "bits"    : 72, "bytes"   : 9 },
    /* 6 */ { "bits"    : 46, "bytes"   : 5 },
    /* 7 */ { "bits"    : 29, "bytes"   : 3 },
    /* 8 */ { "bits"    : 27, "bytes"   : 3 },
    /* 9 */ { "bits"    : 9, "bytes"   : 1 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^18 + x^17 + x^15 + x^13 + x^12 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x16b04f",
    "koopman"    : "0xB5827",
    "normal"     : "0x6b04f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1048555, "bytes"   : 131069 },
    /* 4 */ { "bits"    : 5061, "bytes"   : 632 },
    /* 5 */ { "bits"    : 195, "bytes"   : 24 },
    /* 6 */ { "bits"    : 50, "bytes"   : 6 },
    /* 7 */ { "bits"    : 18, "bytes"   : 2 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 },
    /* 9 */ { "bits"    : 8, "bytes"   : 1 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^18 + x^17 + x^16 + x^14 + x^10 + x^7 + x^4 + x^2 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x174497",
    "koopman"    : "0xBA24B",
    "normal"     : "0x74497"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1048555, "bytes"   : 131069 },
    /* 4 */ { "bits"    : 625, "bytes"   : 78 },
    /* 5 */ { "bits"    : 157, "bytes"   : 19 },
    /* 6 */ { "bits"    : 41, "bytes"   : 5 },
    /* 7 */ { "bits"    : 29, "bytes"   : 3 },
    /* 8 */ { "bits"    : 15, "bytes"   : 1 },
    /* 9 */ { "bits"    : 15, "bytes"   : 1 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 },
    /* 11 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^18 + x^17 + x^16 + x^15 + x^14 + x^11 + x^10 + x^9 + x^6 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 20,
    "explicit"   : "0x17ce7d",
    "koopman"    : "0xBE73E",
    "normal"     : "0x7ce7d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 21, "bytes"   : 2 },
    /* 4 */ { "bits"    : 21, "bytes"   : 2 },
    /* 5 */ { "bits"    : 21, "bytes"   : 2 },
    /* 6 */ { "bits"    : 21, "bytes"   : 2 },
    /* 7 */ { "bits"    : 21, "bytes"   : 2 },
    /* 8 */ { "bits"    : 21, "bytes"   : 2 },
    /* 9 */ { "bits"    : 21, "bytes"   : 2 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^19 + x^13 + x^12 + x^10 + x^8 + x^7 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x18359f",
    "koopman"    : "0xC1ACF",
    "normal"     : "0x8359f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 524267, "bytes"   : 65533 },
    /* 4 */ { "bits"    : 524267, "bytes"   : 65533 },
    /* 5 */ { "bits"    : 294, "bytes"   : 36 },
    /* 6 */ { "bits"    : 294, "bytes"   : 36 },
    /* 7 */ { "bits"    : 24, "bytes"   : 3 },
    /* 8 */ { "bits"    : 24, "bytes"   : 3 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^19 + x^15 + x^12 + x^11 + x^9 + x^8 + x^3 + x^2 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x189b0f",
    "koopman"    : "0xC4D87",
    "normal"     : "0x89b0f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1048555, "bytes"   : 131069 },
    /* 4 */ { "bits"    : 1845, "bytes"   : 230 },
    /* 5 */ { "bits"    : 281, "bytes"   : 35 },
    /* 6 */ { "bits"    : 29, "bytes"   : 3 },
    /* 7 */ { "bits"    : 22, "bytes"   : 2 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 },
    /* 9 */ { "bits"    : 11, "bytes"   : 1 },
    /* 10 */ { "bits"    : 11, "bytes"   : 1 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^19 + x^16 + x^12 + x^10 + x^8 + x^4 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x191513",
    "koopman"    : "0xC8A89",
    "normal"     : "0x91513"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1005, "bytes"   : 125 },
    /* 4 */ { "bits"    : 1005, "bytes"   : 125 },
    /* 5 */ { "bits"    : 1005, "bytes"   : 125 },
    /* 6 */ { "bits"    : 105, "bytes"   : 13 },
    /* 7 */ { "bits"    : 28, "bytes"   : 3 },
    /* 8 */ { "bits"    : 10, "bytes"   : 1 },
    /* 9 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^19 + x^16 + x^15 + x^13 + x^12 + x^11 + x^10 + x^8 + x^7 + x^6 + x^5 + x^4 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x19bdf3",
    "koopman"    : "0xCDEF9",
    "normal"     : "0x9bdf3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1048555, "bytes"   : 131069 },
    /* 4 */ { "bits"    : 766, "bytes"   : 95 },
    /* 5 */ { "bits"    : 272, "bytes"   : 34 },
    /* 6 */ { "bits"    : 113, "bytes"   : 14 },
    /* 7 */ { "bits"    : 20, "bytes"   : 2 },
    /* 8 */ { "bits"    : 10, "bytes"   : 1 },
    /* 9 */ { "bits"    : 10, "bytes"   : 1 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^19 + x^17 + x^15 + x^9 + x^8 + x^7 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x1a839f",
    "koopman"    : "0xD41CF",
    "normal"     : "0xa839f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 106, "bytes"   : 13 },
    /* 4 */ { "bits"    : 106, "bytes"   : 13 },
    /* 5 */ { "bits"    : 46, "bytes"   : 5 },
    /* 6 */ { "bits"    : 46, "bytes"   : 5 },
    /* 7 */ { "bits"    : 45, "bytes"   : 5 },
    /* 8 */ { "bits"    : 45, "bytes"   : 5 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^19 + x^18 + x^14 + x^6 + x^2 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x1c4047",
    "koopman"    : "0xE2023",
    "normal"     : "0xc4047"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1006, "bytes"   : 125 },
    /* 4 */ { "bits"    : 1006, "bytes"   : 125 },
    /* 5 */ { "bits"    : 494, "bytes"   : 61 },
    /* 6 */ { "bits"    : 494, "bytes"   : 61 },
    /* 7 */ { "bits"    : 20, "bytes"   : 2 },
    /* 8 */ { "bits"    : 20, "bytes"   : 2 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^20 + x^19 + x^18 + x^15 + x^14 + x^10 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 20,
    "explicit"   : "0x1cc467",
    "koopman"    : "0xE6233",
    "normal"     : "0xcc467"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 13, "bytes"   : 1 },
    /* 4 */ { "bits"    : 13, "bytes"   : 1 },
    /* 5 */ { "bits"    : 13, "bytes"   : 1 },
    /* 6 */ { "bits"    : 13, "bytes"   : 1 },
    /* 7 */ { "bits"    : 13, "bytes"   : 1 },
    /* 8 */ { "bits"    : 13, "bytes"   : 1 },
    /* 9 */ { "bits"    : 13, "bytes"   : 1 },
    /* 10 */ { "bits"    : 13, "bytes"   : 1 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^2 + 1",
    "degree"     : 21,
    "explicit"   : "0x200005",
    "koopman"    : "0x100002",
    "normal"     : "0x5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2097130, "bytes"   : 262141 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^3 + x^1 + 1",
    "degree"     : 21,
    "explicit"   : "0x20000b",
    "koopman"    : "0x100005",
    "normal"     : "0xb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1048554, "bytes"   : 131069 },
    /* 4 */ { "bits"    : 1048554, "bytes"   : 131069 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^7 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 21,
    "explicit"   : "0x2000ef",
    "koopman"    : "0x100077",
    "normal"     : "0xef"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 262122, "bytes"   : 32765 },
    /* 4 */ { "bits"    : 262122, "bytes"   : 32765 },
    /* 5 */ { "bits"    : 261, "bytes"   : 32 },
    /* 6 */ { "bits"    : 261, "bytes"   : 32 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^16 + x^15 + x^13 + x^12 + x^11 + x^10 + x^9 + x^8 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 21,
    "explicit"   : "0x21bf1f",
    "koopman"    : "0x10DF8F",
    "normal"     : "0x1bf1f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1048554, "bytes"   : 131069 },
    /* 4 */ { "bits"    : 1048554, "bytes"   : 131069 },
    /* 5 */ { "bits"    : 370, "bytes"   : 46 },
    /* 6 */ { "bits"    : 370, "bytes"   : 46 },
    /* 7 */ { "bits"    : 26, "bytes"   : 3 },
    /* 8 */ { "bits"    : 26, "bytes"   : 3 },
    /* 9 */ { "bits"    : 1, "bytes"   : 0 },
    /* 10 */ { "bits"    : 1, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^17 + x^14 + x^13 + x^12 + x^10 + x^8 + x^6 + x^5 + x^4 + 1",
    "degree"     : 21,
    "explicit"   : "0x227571",
    "koopman"    : "0x113AB8",
    "normal"     : "0x27571"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2097130, "bytes"   : 262141 },
    /* 4 */ { "bits"    : 1056, "bytes"   : 132 },
    /* 5 */ { "bits"    : 76, "bytes"   : 9 },
    /* 6 */ { "bits"    : 76, "bytes"   : 9 },
    /* 7 */ { "bits"    : 40, "bytes"   : 5 },
    /* 8 */ { "bits"    : 29, "bytes"   : 3 },
    /* 9 */ { "bits"    : 4, "bytes"   : 0 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^18 + x^16 + x^15 + x^12 + x^10 + x^8 + x^4 + x^3 + x^2 + 1",
    "degree"     : 21,
    "explicit"   : "0x25951d",
    "koopman"    : "0x12CA8E",
    "normal"     : "0x5951d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2097130, "bytes"   : 262141 },
    /* 4 */ { "bits"    : 3088, "bytes"   : 386 },
    /* 5 */ { "bits"    : 241, "bytes"   : 30 },
    /* 6 */ { "bits"    : 52, "bytes"   : 6 },
    /* 7 */ { "bits"    : 19, "bytes"   : 2 },
    /* 8 */ { "bits"    : 19, "bytes"   : 2 },
    /* 9 */ { "bits"    : 19, "bytes"   : 2 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^18 + x^16 + x^15 + x^14 + x^13 + x^12 + x^10 + x^8 + x^6 + x^3 + x^1 + 1",
    "degree"     : 21,
    "explicit"   : "0x25f54b",
    "koopman"    : "0x12FAA5",
    "normal"     : "0x5f54b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 106, "bytes"   : 13 },
    /* 4 */ { "bits"    : 106, "bytes"   : 13 },
    /* 5 */ { "bits"    : 106, "bytes"   : 13 },
    /* 6 */ { "bits"    : 106, "bytes"   : 13 },
    /* 7 */ { "bits"    : 106, "bytes"   : 13 },
    /* 8 */ { "bits"    : 24, "bytes"   : 3 },
    /* 9 */ { "bits"    : 16, "bytes"   : 2 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^18 + x^17 + x^14 + x^12 + x^10 + x^9 + x^7 + x^6 + x^5 + x^4 + x^2 + 1",
    "degree"     : 21,
    "explicit"   : "0x2656f5",
    "koopman"    : "0x132B7A",
    "normal"     : "0x656f5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2097130, "bytes"   : 262141 },
    /* 4 */ { "bits"    : 440, "bytes"   : 55 },
    /* 5 */ { "bits"    : 364, "bytes"   : 45 },
    /* 6 */ { "bits"    : 92, "bytes"   : 11 },
    /* 7 */ { "bits"    : 16, "bytes"   : 2 },
    /* 8 */ { "bits"    : 16, "bytes"   : 2 },
    /* 9 */ { "bits"    : 12, "bytes"   : 1 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^18 + x^17 + x^16 + x^11 + x^9 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 21,
    "explicit"   : "0x270a2f",
    "koopman"    : "0x138517",
    "normal"     : "0x70a2f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2097130, "bytes"   : 262141 },
    /* 4 */ { "bits"    : 2605, "bytes"   : 325 },
    /* 5 */ { "bits"    : 266, "bytes"   : 33 },
    /* 6 */ { "bits"    : 66, "bytes"   : 8 },
    /* 7 */ { "bits"    : 24, "bytes"   : 3 },
    /* 8 */ { "bits"    : 12, "bytes"   : 1 },
    /* 9 */ { "bits"    : 11, "bytes"   : 1 },
    /* 10 */ { "bits"    : 10, "bytes"   : 1 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^19 + x^18 + x^15 + x^13 + x^11 + x^10 + x^9 + x^7 + x^5 + x^1 + 1",
    "degree"     : 21,
    "explicit"   : "0x2caea3",
    "koopman"    : "0x165751",
    "normal"     : "0xcaea3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 10, "bytes"   : 1 },
    /* 4 */ { "bits"    : 10, "bytes"   : 1 },
    /* 5 */ { "bits"    : 10, "bytes"   : 1 },
    /* 6 */ { "bits"    : 10, "bytes"   : 1 },
    /* 7 */ { "bits"    : 10, "bytes"   : 1 },
    /* 8 */ { "bits"    : 10, "bytes"   : 1 },
    /* 9 */ { "bits"    : 10, "bytes"   : 1 },
    /* 10 */ { "bits"    : 10, "bytes"   : 1 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^19 + x^18 + x^16 + x^14 + x^12 + x^11 + x^10 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 21,
    "explicit"   : "0x2d5c67",
    "koopman"    : "0x16AE33",
    "normal"     : "0xd5c67"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2097130, "bytes"   : 262141 },
    /* 4 */ { "bits"    : 1188, "bytes"   : 148 },
    /* 5 */ { "bits"    : 94, "bytes"   : 11 },
    /* 6 */ { "bits"    : 89, "bytes"   : 11 },
    /* 7 */ { "bits"    : 57, "bytes"   : 7 },
    /* 8 */ { "bits"    : 12, "bytes"   : 1 },
    /* 9 */ { "bits"    : 12, "bytes"   : 1 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^19 + x^18 + x^16 + x^15 + x^14 + x^12 + x^9 + x^7 + x^6 + x^5 + x^3 + x^2 + 1",
    "degree"     : 21,
    "explicit"   : "0x2dd2ed",
    "koopman"    : "0x16E976",
    "normal"     : "0xdd2ed"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 20, "bytes"   : 2 },
    /* 4 */ { "bits"    : 20, "bytes"   : 2 },
    /* 5 */ { "bits"    : 20, "bytes"   : 2 },
    /* 6 */ { "bits"    : 20, "bytes"   : 2 },
    /* 7 */ { "bits"    : 20, "bytes"   : 2 },
    /* 8 */ { "bits"    : 20, "bytes"   : 2 },
    /* 9 */ { "bits"    : 20, "bytes"   : 2 },
    /* 10 */ { "bits"    : 20, "bytes"   : 2 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^19 + x^18 + x^17 + x^11 + x^10 + x^9 + x^8 + x^7 + x^6 + x^4 + x^2 + 1",
    "degree"     : 21,
    "explicit"   : "0x2e0fd5",
    "koopman"    : "0x1707EA",
    "normal"     : "0xe0fd5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2097130, "bytes"   : 262141 },
    /* 4 */ { "bits"    : 8525, "bytes"   : 1065 },
    /* 5 */ { "bits"    : 222, "bytes"   : 27 },
    /* 6 */ { "bits"    : 68, "bytes"   : 8 },
    /* 7 */ { "bits"    : 25, "bytes"   : 3 },
    /* 8 */ { "bits"    : 15, "bytes"   : 1 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^20 + x^13 + x^11 + x^7 + x^4 + x^3 + 1",
    "degree"     : 21,
    "explicit"   : "0x302899",
    "koopman"    : "0x18144C",
    "normal"     : "0x102899"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1002, "bytes"   : 125 },
    /* 4 */ { "bits"    : 1002, "bytes"   : 125 },
    /* 5 */ { "bits"    : 1002, "bytes"   : 125 },
    /* 6 */ { "bits"    : 1002, "bytes"   : 125 },
    /* 7 */ { "bits"    : 8, "bytes"   : 1 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^20 + x^17 + x^16 + x^10 + x^9 + x^5 + x^2 + x^1 + 1",
    "degree"     : 21,
    "explicit"   : "0x330627",
    "koopman"    : "0x198313",
    "normal"     : "0x130627"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65514, "bytes"   : 8189 },
    /* 4 */ { "bits"    : 65514, "bytes"   : 8189 },
    /* 5 */ { "bits"    : 175, "bytes"   : 21 },
    /* 6 */ { "bits"    : 175, "bytes"   : 21 },
    /* 7 */ { "bits"    : 48, "bytes"   : 6 },
    /* 8 */ { "bits"    : 48, "bytes"   : 6 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^20 + x^18 + x^16 + x^14 + x^13 + x^10 + x^9 + x^7 + x^3 + 1",
    "degree"     : 21,
    "explicit"   : "0x356689",
    "koopman"    : "0x1AB344",
    "normal"     : "0x156689"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2097130, "bytes"   : 262141 },
    /* 4 */ { "bits"    : 439, "bytes"   : 54 },
    /* 5 */ { "bits"    : 194, "bytes"   : 24 },
    /* 6 */ { "bits"    : 65, "bytes"   : 8 },
    /* 7 */ { "bits"    : 27, "bytes"   : 3 },
    /* 8 */ { "bits"    : 15, "bytes"   : 1 },
    /* 9 */ { "bits"    : 11, "bytes"   : 1 },
    /* 10 */ { "bits"    : 11, "bytes"   : 1 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^20 + x^19 + x^15 + x^14 + x^13 + x^12 + x^11 + x^9 + x^7 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 21,
    "explicit"   : "0x38fae7",
    "koopman"    : "0x1C7D73",
    "normal"     : "0x18fae7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2097130, "bytes"   : 262141 },
    /* 4 */ { "bits"    : 2478, "bytes"   : 309 },
    /* 5 */ { "bits"    : 510, "bytes"   : 63 },
    /* 6 */ { "bits"    : 25, "bytes"   : 3 },
    /* 7 */ { "bits"    : 25, "bytes"   : 3 },
    /* 8 */ { "bits"    : 16, "bytes"   : 2 },
    /* 9 */ { "bits"    : 13, "bytes"   : 1 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^20 + x^19 + x^17 + x^14 + x^13 + x^12 + x^10 + x^9 + x^8 + x^2 + x^1 + 1",
    "degree"     : 21,
    "explicit"   : "0x3a7707",
    "koopman"    : "0x1D3B83",
    "normal"     : "0x1a7707"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2097130, "bytes"   : 262141 },
    /* 4 */ { "bits"    : 1077, "bytes"   : 134 },
    /* 5 */ { "bits"    : 223, "bytes"   : 27 },
    /* 6 */ { "bits"    : 137, "bytes"   : 17 },
    /* 7 */ { "bits"    : 36, "bytes"   : 4 },
    /* 8 */ { "bits"    : 3, "bytes"   : 0 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 },
    /* 10 */ { "bits"    : 3, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^21 + x^20 + x^19 + x^18 + x^16 + x^15 + x^13 + x^12 + x^11 + x^10 + x^9 + x^8 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 21,
    "explicit"   : "0x3dbf6f",
    "koopman"    : "0x1EDFB7",
    "normal"     : "0x1dbf6f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1004, "bytes"   : 125 },
    /* 4 */ { "bits"    : 1004, "bytes"   : 125 },
    /* 5 */ { "bits"    : 1004, "bytes"   : 125 },
    /* 6 */ { "bits"    : 1004, "bytes"   : 125 },
    /* 7 */ { "bits"    : 28, "bytes"   : 3 },
    /* 8 */ { "bits"    : 28, "bytes"   : 3 },
    /* 9 */ { "bits"    : 7, "bytes"   : 0 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x400003",
    "koopman"    : "0x200001",
    "normal"     : "0x3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4194281, "bytes"   : 524285 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^7 + x^3 + x^2 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x40008f",
    "koopman"    : "0x200047",
    "normal"     : "0x8f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2097129, "bytes"   : 262141 },
    /* 4 */ { "bits"    : 2097129, "bytes"   : 262141 },
    /* 5 */ { "bits"    : 185, "bytes"   : 23 },
    /* 6 */ { "bits"    : 185, "bytes"   : 23 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^7 + x^5 + x^2 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x4000a7",
    "koopman"    : "0x200053",
    "normal"     : "0xa7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 680063, "bytes"   : 85007 },
    /* 4 */ { "bits"    : 680063, "bytes"   : 85007 },
    /* 5 */ { "bits"    : 412, "bytes"   : 51 },
    /* 6 */ { "bits"    : 412, "bytes"   : 51 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^18 + x^16 + x^15 + x^14 + x^12 + x^11 + x^10 + x^9 + x^8 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x45df6f",
    "koopman"    : "0x22EFB7",
    "normal"     : "0x5df6f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 40, "bytes"   : 5 },
    /* 4 */ { "bits"    : 40, "bytes"   : 5 },
    /* 5 */ { "bits"    : 10, "bytes"   : 1 },
    /* 6 */ { "bits"    : 10, "bytes"   : 1 },
    /* 7 */ { "bits"    : 10, "bytes"   : 1 },
    /* 8 */ { "bits"    : 10, "bytes"   : 1 },
    /* 9 */ { "bits"    : 10, "bytes"   : 1 },
    /* 10 */ { "bits"    : 10, "bytes"   : 1 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^19 + x^15 + x^14 + x^13 + x^12 + x^10 + x^9 + x^8 + x^7 + x^3 + 1",
    "degree"     : 22,
    "explicit"   : "0x48f789",
    "koopman"    : "0x247BC4",
    "normal"     : "0x8f789"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 60, "bytes"   : 7 },
    /* 4 */ { "bits"    : 60, "bytes"   : 7 },
    /* 5 */ { "bits"    : 20, "bytes"   : 2 },
    /* 6 */ { "bits"    : 20, "bytes"   : 2 },
    /* 7 */ { "bits"    : 20, "bytes"   : 2 },
    /* 8 */ { "bits"    : 20, "bytes"   : 2 },
    /* 9 */ { "bits"    : 20, "bytes"   : 2 },
    /* 10 */ { "bits"    : 20, "bytes"   : 2 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^19 + x^16 + x^11 + x^10 + x^9 + x^8 + x^5 + x^3 + 1",
    "degree"     : 22,
    "explicit"   : "0x490f29",
    "koopman"    : "0x248794",
    "normal"     : "0x90f29"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2097129, "bytes"   : 262141 },
    /* 4 */ { "bits"    : 2097129, "bytes"   : 262141 },
    /* 5 */ { "bits"    : 509, "bytes"   : 63 },
    /* 6 */ { "bits"    : 509, "bytes"   : 63 },
    /* 7 */ { "bits"    : 26, "bytes"   : 3 },
    /* 8 */ { "bits"    : 26, "bytes"   : 3 },
    /* 9 */ { "bits"    : 12, "bytes"   : 1 },
    /* 10 */ { "bits"    : 12, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^19 + x^17 + x^16 + x^15 + x^13 + x^11 + x^7 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x4ba8cf",
    "koopman"    : "0x25D467",
    "normal"     : "0xba8cf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 275225, "bytes"   : 34403 },
    /* 4 */ { "bits"    : 3391, "bytes"   : 423 },
    /* 5 */ { "bits"    : 195, "bytes"   : 24 },
    /* 6 */ { "bits"    : 162, "bytes"   : 20 },
    /* 7 */ { "bits"    : 39, "bytes"   : 4 },
    /* 8 */ { "bits"    : 5, "bytes"   : 0 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^19 + x^17 + x^16 + x^15 + x^14 + x^12 + x^11 + x^10 + x^9 + x^7 + x^6 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x4bdefb",
    "koopman"    : "0x25EF7D",
    "normal"     : "0xbdefb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4194281, "bytes"   : 524285 },
    /* 4 */ { "bits"    : 715, "bytes"   : 89 },
    /* 5 */ { "bits"    : 197, "bytes"   : 24 },
    /* 6 */ { "bits"    : 164, "bytes"   : 20 },
    /* 7 */ { "bits"    : 50, "bytes"   : 6 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 },
    /* 9 */ { "bits"    : 4, "bytes"   : 0 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 },
    /* 11 */ { "bits"    : 3, "bytes"   : 0 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^19 + x^18 + x^17 + x^14 + x^12 + x^9 + x^8 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x4e536b",
    "koopman"    : "0x2729B5",
    "normal"     : "0xe536b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4194281, "bytes"   : 524285 },
    /* 4 */ { "bits"    : 3089, "bytes"   : 386 },
    /* 5 */ { "bits"    : 394, "bytes"   : 49 },
    /* 6 */ { "bits"    : 44, "bytes"   : 5 },
    /* 7 */ { "bits"    : 41, "bytes"   : 5 },
    /* 8 */ { "bits"    : 12, "bytes"   : 1 },
    /* 9 */ { "bits"    : 8, "bytes"   : 1 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^20 + x^16 + x^13 + x^12 + x^11 + x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 22,
    "explicit"   : "0x5139fd",
    "koopman"    : "0x289CFE",
    "normal"     : "0x1139fd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 105, "bytes"   : 13 },
    /* 4 */ { "bits"    : 105, "bytes"   : 13 },
    /* 5 */ { "bits"    : 105, "bytes"   : 13 },
    /* 6 */ { "bits"    : 105, "bytes"   : 13 },
    /* 7 */ { "bits"    : 105, "bytes"   : 13 },
    /* 8 */ { "bits"    : 105, "bytes"   : 13 },
    /* 9 */ { "bits"    : 15, "bytes"   : 1 },
    /* 10 */ { "bits"    : 15, "bytes"   : 1 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^20 + x^17 + x^15 + x^12 + x^11 + x^9 + x^7 + x^5 + x^3 + 1",
    "degree"     : 22,
    "explicit"   : "0x529aa9",
    "koopman"    : "0x294D54",
    "normal"     : "0x129aa9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4194281, "bytes"   : 524285 },
    /* 4 */ { "bits"    : 4583, "bytes"   : 572 },
    /* 5 */ { "bits"    : 195, "bytes"   : 24 },
    /* 6 */ { "bits"    : 31, "bytes"   : 3 },
    /* 7 */ { "bits"    : 31, "bytes"   : 3 },
    /* 8 */ { "bits"    : 19, "bytes"   : 2 },
    /* 9 */ { "bits"    : 15, "bytes"   : 1 },
    /* 10 */ { "bits"    : 15, "bytes"   : 1 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^20 + x^18 + x^16 + x^13 + x^11 + x^9 + x^6 + x^4 + x^2 + 1",
    "degree"     : 22,
    "explicit"   : "0x552a55",
    "koopman"    : "0x2A952A",
    "normal"     : "0x152a55"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2025, "bytes"   : 253 },
    /* 4 */ { "bits"    : 2025, "bytes"   : 253 },
    /* 5 */ { "bits"    : 2025, "bytes"   : 253 },
    /* 6 */ { "bits"    : 158, "bytes"   : 19 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 },
    /* 8 */ { "bits"    : 2, "bytes"   : 0 },
    /* 9 */ { "bits"    : 2, "bytes"   : 0 },
    /* 10 */ { "bits"    : 2, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^20 + x^18 + x^16 + x^15 + x^14 + x^12 + x^11 + x^9 + x^8 + x^7 + x^5 + x^2 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x55dba7",
    "koopman"    : "0x2AEDD3",
    "normal"     : "0x15dba7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 3669987, "bytes"   : 458748 },
    /* 4 */ { "bits"    : 4063, "bytes"   : 507 },
    /* 5 */ { "bits"    : 302, "bytes"   : 37 },
    /* 6 */ { "bits"    : 105, "bytes"   : 13 },
    /* 7 */ { "bits"    : 40, "bytes"   : 5 },
    /* 8 */ { "bits"    : 22, "bytes"   : 2 },
    /* 9 */ { "bits"    : 22, "bytes"   : 2 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^20 + x^19 + x^17 + x^16 + x^15 + x^12 + x^11 + x^10 + x^8 + x^5 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x5b9d23",
    "koopman"    : "0x2DCE91",
    "normal"     : "0x1b9d23"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 173, "bytes"   : 21 },
    /* 4 */ { "bits"    : 173, "bytes"   : 21 },
    /* 5 */ { "bits"    : 6, "bytes"   : 0 },
    /* 6 */ { "bits"    : 6, "bytes"   : 0 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^21 + x^16 + x^12 + x^11 + x^10 + x^9 + x^8 + x^7 + x^5 + x^2 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x611fa7",
    "koopman"    : "0x308FD3",
    "normal"     : "0x211fa7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4194281, "bytes"   : 524285 },
    /* 4 */ { "bits"    : 12077, "bytes"   : 1509 },
    /* 5 */ { "bits"    : 186, "bytes"   : 23 },
    /* 6 */ { "bits"    : 100, "bytes"   : 12 },
    /* 7 */ { "bits"    : 39, "bytes"   : 4 },
    /* 8 */ { "bits"    : 9, "bytes"   : 1 },
    /* 9 */ { "bits"    : 9, "bytes"   : 1 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^21 + x^19 + x^18 + x^16 + x^15 + x^14 + x^8 + x^5 + x^4 + 1",
    "degree"     : 22,
    "explicit"   : "0x6dc131",
    "koopman"    : "0x36E098",
    "normal"     : "0x2dc131"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4194281, "bytes"   : 524285 },
    /* 4 */ { "bits"    : 577, "bytes"   : 72 },
    /* 5 */ { "bits"    : 387, "bytes"   : 48 },
    /* 6 */ { "bits"    : 65, "bytes"   : 8 },
    /* 7 */ { "bits"    : 35, "bytes"   : 4 },
    /* 8 */ { "bits"    : 12, "bytes"   : 1 },
    /* 9 */ { "bits"    : 12, "bytes"   : 1 },
    /* 10 */ { "bits"    : 12, "bytes"   : 1 },
    /* 11 */ { "bits"    : 12, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^21 + x^19 + x^18 + x^16 + x^15 + x^14 + x^11 + 1",
    "degree"     : 22,
    "explicit"   : "0x6dc801",
    "koopman"    : "0x36E400",
    "normal"     : "0x2dc801"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4194281, "bytes"   : 524285 },
    /* 4 */ { "bits"    : 6553, "bytes"   : 819 },
    /* 5 */ { "bits"    : 67, "bytes"   : 8 },
    /* 6 */ { "bits"    : 67, "bytes"   : 8 },
    /* 7 */ { "bits"    : 45, "bytes"   : 5 },
    /* 8 */ { "bits"    : 38, "bytes"   : 4 },
    /* 9 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^21 + x^19 + x^18 + x^16 + x^15 + x^14 + x^13 + x^11 + x^10 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x6dec4f",
    "koopman"    : "0x36F627",
    "normal"     : "0x2dec4f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 3669987, "bytes"   : 458748 },
    /* 4 */ { "bits"    : 2931, "bytes"   : 366 },
    /* 5 */ { "bits"    : 263, "bytes"   : 32 },
    /* 6 */ { "bits"    : 72, "bytes"   : 9 },
    /* 7 */ { "bits"    : 20, "bytes"   : 2 },
    /* 8 */ { "bits"    : 20, "bytes"   : 2 },
    /* 9 */ { "bits"    : 12, "bytes"   : 1 },
    /* 10 */ { "bits"    : 12, "bytes"   : 1 },
    /* 11 */ { "bits"    : 12, "bytes"   : 1 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^21 + x^20 + x^16 + x^14 + x^13 + x^8 + x^7 + x^5 + x^2 + 1",
    "degree"     : 22,
    "explicit"   : "0x7161a5",
    "koopman"    : "0x38B0D2",
    "normal"     : "0x3161a5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4194281, "bytes"   : 524285 },
    /* 4 */ { "bits"    : 641, "bytes"   : 80 },
    /* 5 */ { "bits"    : 292, "bytes"   : 36 },
    /* 6 */ { "bits"    : 110, "bytes"   : 13 },
    /* 7 */ { "bits"    : 37, "bytes"   : 4 },
    /* 8 */ { "bits"    : 22, "bytes"   : 2 },
    /* 9 */ { "bits"    : 21, "bytes"   : 2 },
    /* 10 */ { "bits"    : 9, "bytes"   : 1 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^21 + x^20 + x^17 + x^13 + x^11 + x^9 + x^8 + x^7 + x^6 + x^4 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x722bd3",
    "koopman"    : "0x3915E9",
    "normal"     : "0x322bd3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4194281, "bytes"   : 524285 },
    /* 4 */ { "bits"    : 3745, "bytes"   : 468 },
    /* 5 */ { "bits"    : 6, "bytes"   : 0 },
    /* 6 */ { "bits"    : 6, "bytes"   : 0 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^21 + x^20 + x^17 + x^15 + x^13 + x^12 + x^10 + x^9 + x^7 + x^5 + x^2 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x72b6a7",
    "koopman"    : "0x395B53",
    "normal"     : "0x32b6a7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2028, "bytes"   : 253 },
    /* 4 */ { "bits"    : 2028, "bytes"   : 253 },
    /* 5 */ { "bits"    : 1004, "bytes"   : 125 },
    /* 6 */ { "bits"    : 1004, "bytes"   : 125 },
    /* 7 */ { "bits"    : 34, "bytes"   : 4 },
    /* 8 */ { "bits"    : 34, "bytes"   : 4 },
    /* 9 */ { "bits"    : 4, "bytes"   : 0 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^21 + x^20 + x^18 + x^17 + x^16 + x^15 + x^10 + x^9 + x^5 + x^3 + x^2 + 1",
    "degree"     : 22,
    "explicit"   : "0x77862d",
    "koopman"    : "0x3BC316",
    "normal"     : "0x37862d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4194281, "bytes"   : 524285 },
    /* 4 */ { "bits"    : 2153, "bytes"   : 269 },
    /* 5 */ { "bits"    : 632, "bytes"   : 79 },
    /* 6 */ { "bits"    : 70, "bytes"   : 8 },
    /* 7 */ { "bits"    : 14, "bytes"   : 1 },
    /* 8 */ { "bits"    : 14, "bytes"   : 1 },
    /* 9 */ { "bits"    : 14, "bytes"   : 1 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^22 + x^21 + x^20 + x^19 + x^18 + x^16 + x^15 + x^14 + x^13 + x^12 + x^8 + x^6 + x^5 + x^1 + 1",
    "degree"     : 22,
    "explicit"   : "0x7df163",
    "koopman"    : "0x3EF8B1",
    "normal"     : "0x3df163"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4194281, "bytes"   : 524285 },
    /* 4 */ { "bits"    : 1986, "bytes"   : 248 },
    /* 5 */ { "bits"    : 300, "bytes"   : 37 },
    /* 6 */ { "bits"    : 78, "bytes"   : 9 },
    /* 7 */ { "bits"    : 69, "bytes"   : 8 },
    /* 8 */ { "bits"    : 17, "bytes"   : 2 },
    /* 9 */ { "bits"    : 12, "bytes"   : 1 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^5 + 1",
    "degree"     : 23,
    "explicit"   : "0x800021",
    "koopman"    : "0x400010",
    "normal"     : "0x21"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388584, "bytes"   : 1048573 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 23,
    "explicit"   : "0x800037",
    "koopman"    : "0x40001B",
    "normal"     : "0x37"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4194280, "bytes"   : 524285 },
    /* 4 */ { "bits"    : 4194280, "bytes"   : 524285 },
    /* 5 */ { "bits"    : 133, "bytes"   : 16 },
    /* 6 */ { "bits"    : 133, "bytes"   : 16 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^7 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 23,
    "explicit"   : "0x8000f7",
    "koopman"    : "0x40007B",
    "normal"     : "0xf7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1653517, "bytes"   : 206689 },
    /* 4 */ { "bits"    : 1653517, "bytes"   : 206689 },
    /* 5 */ { "bits"    : 425, "bytes"   : 53 },
    /* 6 */ { "bits"    : 425, "bytes"   : 53 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^9 + x^7 + x^5 + x^3 + 1",
    "degree"     : 23,
    "explicit"   : "0x8002a9",
    "koopman"    : "0x400154",
    "normal"     : "0x2a9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4194280, "bytes"   : 524285 },
    /* 4 */ { "bits"    : 4194280, "bytes"   : 524285 },
    /* 5 */ { "bits"    : 601, "bytes"   : 75 },
    /* 6 */ { "bits"    : 601, "bytes"   : 75 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^18 + x^15 + x^12 + x^11 + x^10 + x^9 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 23,
    "explicit"   : "0x849e77",
    "koopman"    : "0x424F3B",
    "normal"     : "0x49e77"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388584, "bytes"   : 1048573 },
    /* 4 */ { "bits"    : 3180, "bytes"   : 397 },
    /* 5 */ { "bits"    : 823, "bytes"   : 102 },
    /* 6 */ { "bits"    : 62, "bytes"   : 7 },
    /* 7 */ { "bits"    : 38, "bytes"   : 4 },
    /* 8 */ { "bits"    : 28, "bytes"   : 3 },
    /* 9 */ { "bits"    : 13, "bytes"   : 1 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^18 + x^16 + x^13 + x^11 + x^10 + x^9 + x^8 + x^6 + x^5 + 1",
    "degree"     : 23,
    "explicit"   : "0x852f61",
    "koopman"    : "0x4297B0",
    "normal"     : "0x52f61"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388584, "bytes"   : 1048573 },
    /* 4 */ { "bits"    : 3560, "bytes"   : 445 },
    /* 5 */ { "bits"    : 487, "bytes"   : 60 },
    /* 6 */ { "bits"    : 130, "bytes"   : 16 },
    /* 7 */ { "bits"    : 47, "bytes"   : 5 },
    /* 8 */ { "bits"    : 42, "bytes"   : 5 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^19 + x^18 + x^14 + x^13 + x^12 + x^10 + x^9 + x^7 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 23,
    "explicit"   : "0x8c76ef",
    "koopman"    : "0x463B77",
    "normal"     : "0xc76ef"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 24, "bytes"   : 3 },
    /* 4 */ { "bits"    : 24, "bytes"   : 3 },
    /* 5 */ { "bits"    : 24, "bytes"   : 3 },
    /* 6 */ { "bits"    : 24, "bytes"   : 3 },
    /* 7 */ { "bits"    : 24, "bytes"   : 3 },
    /* 8 */ { "bits"    : 24, "bytes"   : 3 },
    /* 9 */ { "bits"    : 24, "bytes"   : 3 },
    /* 10 */ { "bits"    : 24, "bytes"   : 3 },
    /* 11 */ { "bits"    : 24, "bytes"   : 3 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^19 + x^18 + x^16 + x^13 + x^12 + x^11 + x^9 + x^7 + x^6 + x^5 + x^4 + x^3 + 1",
    "degree"     : 23,
    "explicit"   : "0x8d3af9",
    "koopman"    : "0x469D7C",
    "normal"     : "0xd3af9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 231, "bytes"   : 28 },
    /* 4 */ { "bits"    : 231, "bytes"   : 28 },
    /* 5 */ { "bits"    : 105, "bytes"   : 13 },
    /* 6 */ { "bits"    : 105, "bytes"   : 13 },
    /* 7 */ { "bits"    : 105, "bytes"   : 13 },
    /* 8 */ { "bits"    : 105, "bytes"   : 13 },
    /* 9 */ { "bits"    : 5, "bytes"   : 0 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^19 + x^18 + x^16 + x^14 + x^13 + x^9 + x^8 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 23,
    "explicit"   : "0x8d6357",
    "koopman"    : "0x46B1AB",
    "normal"     : "0xd6357"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388584, "bytes"   : 1048573 },
    /* 4 */ { "bits"    : 3590, "bytes"   : 448 },
    /* 5 */ { "bits"    : 301, "bytes"   : 37 },
    /* 6 */ { "bits"    : 208, "bytes"   : 26 },
    /* 7 */ { "bits"    : 28, "bytes"   : 3 },
    /* 8 */ { "bits"    : 14, "bytes"   : 1 },
    /* 9 */ { "bits"    : 13, "bytes"   : 1 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^20 + x^17 + x^16 + x^14 + x^12 + x^11 + x^9 + x^7 + x^5 + x^2 + 1",
    "degree"     : 23,
    "explicit"   : "0x935aa5",
    "koopman"    : "0x49AD52",
    "normal"     : "0x135aa5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4177387, "bytes"   : 522173 },
    /* 4 */ { "bits"    : 4177387, "bytes"   : 522173 },
    /* 5 */ { "bits"    : 378, "bytes"   : 47 },
    /* 6 */ { "bits"    : 378, "bytes"   : 47 },
    /* 7 */ { "bits"    : 47, "bytes"   : 5 },
    /* 8 */ { "bits"    : 47, "bytes"   : 5 },
    /* 9 */ { "bits"    : 15, "bytes"   : 1 },
    /* 10 */ { "bits"    : 15, "bytes"   : 1 },
    /* 11 */ { "bits"    : 13, "bytes"   : 1 },
    /* 12 */ { "bits"    : 13, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^20 + x^18 + x^17 + x^15 + x^13 + x^12 + x^7 + x^5 + x^4 + 1",
    "degree"     : 23,
    "explicit"   : "0x96b0b1",
    "koopman"    : "0x4B5858",
    "normal"     : "0x16b0b1"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388584, "bytes"   : 1048573 },
    /* 4 */ { "bits"    : 6142, "bytes"   : 767 },
    /* 5 */ { "bits"    : 374, "bytes"   : 46 },
    /* 6 */ { "bits"    : 83, "bytes"   : 10 },
    /* 7 */ { "bits"    : 81, "bytes"   : 10 },
    /* 8 */ { "bits"    : 15, "bytes"   : 1 },
    /* 9 */ { "bits"    : 10, "bytes"   : 1 },
    /* 10 */ { "bits"    : 10, "bytes"   : 1 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^20 + x^18 + x^17 + x^15 + x^14 + x^13 + x^12 + x^9 + x^8 + x^7 + x^5 + x^1 + 1",
    "degree"     : 23,
    "explicit"   : "0x96f3a3",
    "koopman"    : "0x4B79D1",
    "normal"     : "0x16f3a3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 453367, "bytes"   : 56670 },
    /* 4 */ { "bits"    : 453367, "bytes"   : 56670 },
    /* 5 */ { "bits"    : 324, "bytes"   : 40 },
    /* 6 */ { "bits"    : 324, "bytes"   : 40 },
    /* 7 */ { "bits"    : 44, "bytes"   : 5 },
    /* 8 */ { "bits"    : 44, "bytes"   : 5 },
    /* 9 */ { "bits"    : 7, "bytes"   : 0 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^21 + x^18 + x^17 + x^16 + x^15 + x^13 + x^12 + x^11 + x^10 + x^9 + x^7 + x^6 + x^4 + x^3 + x^2 + 1",
    "degree"     : 23,
    "explicit"   : "0xa7bedd",
    "koopman"    : "0x53DF6E",
    "normal"     : "0x27bedd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1193632, "bytes"   : 149204 },
    /* 4 */ { "bits"    : 4816, "bytes"   : 602 },
    /* 5 */ { "bits"    : 510, "bytes"   : 63 },
    /* 6 */ { "bits"    : 126, "bytes"   : 15 },
    /* 7 */ { "bits"    : 33, "bytes"   : 4 },
    /* 8 */ { "bits"    : 26, "bytes"   : 3 },
    /* 9 */ { "bits"    : 26, "bytes"   : 3 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^21 + x^19 + x^12 + x^11 + x^9 + x^8 + x^7 + x^6 + x^5 + 1",
    "degree"     : 23,
    "explicit"   : "0xa81be1",
    "koopman"    : "0x540DF0",
    "normal"     : "0x281be1"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388584, "bytes"   : 1048573 },
    /* 4 */ { "bits"    : 18926, "bytes"   : 2365 },
    /* 5 */ { "bits"    : 420, "bytes"   : 52 },
    /* 6 */ { "bits"    : 96, "bytes"   : 12 },
    /* 7 */ { "bits"    : 36, "bytes"   : 4 },
    /* 8 */ { "bits"    : 7, "bytes"   : 0 },
    /* 9 */ { "bits"    : 7, "bytes"   : 0 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^21 + x^20 + x^18 + x^17 + x^14 + x^13 + x^12 + x^11 + x^8 + x^6 + x^3 + 1",
    "degree"     : 23,
    "explicit"   : "0xb67949",
    "koopman"    : "0x5B3CA4",
    "normal"     : "0x367949"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388584, "bytes"   : 1048573 },
    /* 4 */ { "bits"    : 5982, "bytes"   : 747 },
    /* 5 */ { "bits"    : 134, "bytes"   : 16 },
    /* 6 */ { "bits"    : 106, "bytes"   : 13 },
    /* 7 */ { "bits"    : 27, "bytes"   : 3 },
    /* 8 */ { "bits"    : 27, "bytes"   : 3 },
    /* 9 */ { "bits"    : 26, "bytes"   : 3 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 3, "bytes"   : 0 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^21 + x^20 + x^19 + x^18 + x^14 + x^11 + x^5 + x^4 + x^1 + 1",
    "degree"     : 23,
    "explicit"   : "0xbc4833",
    "koopman"    : "0x5E2419",
    "normal"     : "0x3c4833"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 358, "bytes"   : 44 },
    /* 4 */ { "bits"    : 358, "bytes"   : 44 },
    /* 5 */ { "bits"    : 107, "bytes"   : 13 },
    /* 6 */ { "bits"    : 107, "bytes"   : 13 },
    /* 7 */ { "bits"    : 106, "bytes"   : 13 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 },
    /* 9 */ { "bits"    : 8, "bytes"   : 1 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^21 + x^20 + x^19 + x^18 + x^15 + x^14 + x^13 + x^12 + x^10 + x^9 + x^6 + x^2 + x^1 + 1",
    "degree"     : 23,
    "explicit"   : "0xbcf647",
    "koopman"    : "0x5E7B23",
    "normal"     : "0x3cf647"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388584, "bytes"   : 1048573 },
    /* 4 */ { "bits"    : 3015, "bytes"   : 376 },
    /* 5 */ { "bits"    : 312, "bytes"   : 39 },
    /* 6 */ { "bits"    : 77, "bytes"   : 9 },
    /* 7 */ { "bits"    : 28, "bytes"   : 3 },
    /* 8 */ { "bits"    : 28, "bytes"   : 3 },
    /* 9 */ { "bits"    : 17, "bytes"   : 2 },
    /* 10 */ { "bits"    : 14, "bytes"   : 1 },
    /* 11 */ { "bits"    : 14, "bytes"   : 1 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^22 + x^19 + x^18 + x^17 + x^14 + x^13 + x^9 + x^7 + x^6 + x^5 + x^1 + 1",
    "degree"     : 23,
    "explicit"   : "0xce62e3",
    "koopman"    : "0x673171",
    "normal"     : "0x4e62e3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388584, "bytes"   : 1048573 },
    /* 4 */ { "bits"    : 5142, "bytes"   : 642 },
    /* 5 */ { "bits"    : 435, "bytes"   : 54 },
    /* 6 */ { "bits"    : 86, "bytes"   : 10 },
    /* 7 */ { "bits"    : 42, "bytes"   : 5 },
    /* 8 */ { "bits"    : 11, "bytes"   : 1 },
    /* 9 */ { "bits"    : 11, "bytes"   : 1 },
    /* 10 */ { "bits"    : 10, "bytes"   : 1 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^23 + x^22 + x^20 + x^18 + x^17 + x^16 + x^15 + x^8 + x^7 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 23,
    "explicit"   : "0xd781eb",
    "koopman"    : "0x6BC0F5",
    "normal"     : "0x5781eb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2026, "bytes"   : 253 },
    /* 4 */ { "bits"    : 2026, "bytes"   : 253 },
    /* 5 */ { "bits"    : 2026, "bytes"   : 253 },
    /* 6 */ { "bits"    : 2026, "bytes"   : 253 },
    /* 7 */ { "bits"    : 39, "bytes"   : 4 },
    /* 8 */ { "bits"    : 39, "bytes"   : 4 },
    /* 9 */ { "bits"    : 11, "bytes"   : 1 },
    /* 10 */ { "bits"    : 11, "bytes"   : 1 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^2 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x1000007",
    "koopman"    : "0x800003",
    "normal"     : "0x7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388583, "bytes"   : 1048572 },
    /* 4 */ { "bits"    : 8388583, "bytes"   : 1048572 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^4 + x^3 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x100001b",
    "koopman"    : "0x80000D",
    "normal"     : "0x1b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16777191, "bytes"   : 2097148 },
    /* 4 */ { "bits"    : 5815, "bytes"   : 726 },
    /* 5 */ { "bits"    : 509, "bytes"   : 63 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^8 + x^5 + x^4 + x^2 + 1",
    "degree"     : 24,
    "explicit"   : "0x1000135",
    "koopman"    : "0x80009A",
    "normal"     : "0x135"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388583, "bytes"   : 1048572 },
    /* 4 */ { "bits"    : 8388583, "bytes"   : 1048572 },
    /* 5 */ { "bits"    : 667, "bytes"   : 83 },
    /* 6 */ { "bits"    : 667, "bytes"   : 83 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^10 + x^9 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x100065b",
    "koopman"    : "0x80032D",
    "normal"     : "0x65b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388583, "bytes"   : 1048572 },
    /* 4 */ { "bits"    : 8388583, "bytes"   : 1048572 },
    /* 5 */ { "bits"    : 476, "bytes"   : 59 },
    /* 6 */ { "bits"    : 476, "bytes"   : 59 },
    /* 7 */ { "bits"    : 74, "bytes"   : 9 },
    /* 8 */ { "bits"    : 74, "bytes"   : 9 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^20 + x^12 + x^11 + x^10 + x^8 + x^7 + x^6 + x^3 + x^2 + 1",
    "degree"     : 24,
    "explicit"   : "0x1101dcd",
    "koopman"    : "0x880EE6",
    "normal"     : "0x101dcd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 231, "bytes"   : 28 },
    /* 4 */ { "bits"    : 231, "bytes"   : 28 },
    /* 5 */ { "bits"    : 231, "bytes"   : 28 },
    /* 6 */ { "bits"    : 231, "bytes"   : 28 },
    /* 7 */ { "bits"    : 231, "bytes"   : 28 },
    /* 8 */ { "bits"    : 42, "bytes"   : 5 },
    /* 9 */ { "bits"    : 12, "bytes"   : 1 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^20 + x^19 + x^16 + x^15 + x^13 + x^12 + x^9 + x^6 + x^4 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x119b253",
    "koopman"    : "0x8CD929",
    "normal"     : "0x19b253"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 23, "bytes"   : 2 },
    /* 4 */ { "bits"    : 23, "bytes"   : 2 },
    /* 5 */ { "bits"    : 23, "bytes"   : 2 },
    /* 6 */ { "bits"    : 23, "bytes"   : 2 },
    /* 7 */ { "bits"    : 23, "bytes"   : 2 },
    /* 8 */ { "bits"    : 23, "bytes"   : 2 },
    /* 9 */ { "bits"    : 23, "bytes"   : 2 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 23, "bytes"   : 2 },
    /* 12 */ { "bits"    : 23, "bytes"   : 2 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^20 + x^19 + x^17 + x^14 + x^13 + x^12 + x^11 + x^7 + x^6 + x^5 + x^2 + 1",
    "degree"     : 24,
    "explicit"   : "0x11a78e5",
    "koopman"    : "0x8D3C72",
    "normal"     : "0x1a78e5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16777191, "bytes"   : 2097148 },
    /* 4 */ { "bits"    : 415, "bytes"   : 51 },
    /* 5 */ { "bits"    : 415, "bytes"   : 51 },
    /* 6 */ { "bits"    : 135, "bytes"   : 16 },
    /* 7 */ { "bits"    : 97, "bytes"   : 12 },
    /* 8 */ { "bits"    : 16, "bytes"   : 2 },
    /* 9 */ { "bits"    : 11, "bytes"   : 1 },
    /* 10 */ { "bits"    : 11, "bytes"   : 1 },
    /* 11 */ { "bits"    : 9, "bytes"   : 1 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^20 + x^19 + x^18 + x^17 + x^16 + x^13 + x^8 + x^7 + x^6 + x^2 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x11f21c7",
    "koopman"    : "0x8F90E3",
    "normal"     : "0x1f21c7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16777191, "bytes"   : 2097148 },
    /* 4 */ { "bits"    : 22868, "bytes"   : 2858 },
    /* 5 */ { "bits"    : 599, "bytes"   : 74 },
    /* 6 */ { "bits"    : 47, "bytes"   : 5 },
    /* 7 */ { "bits"    : 37, "bytes"   : 4 },
    /* 8 */ { "bits"    : 33, "bytes"   : 4 },
    /* 9 */ { "bits"    : 12, "bytes"   : 1 },
    /* 10 */ { "bits"    : 10, "bytes"   : 1 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^21 + x^18 + x^17 + x^16 + x^15 + x^12 + x^10 + x^9 + x^7 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x127969f",
    "koopman"    : "0x93CB4F",
    "normal"     : "0x27969f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16777191, "bytes"   : 2097148 },
    /* 4 */ { "bits"    : 8880, "bytes"   : 1110 },
    /* 5 */ { "bits"    : 1060, "bytes"   : 132 },
    /* 6 */ { "bits"    : 52, "bytes"   : 6 },
    /* 7 */ { "bits"    : 39, "bytes"   : 4 },
    /* 8 */ { "bits"    : 19, "bytes"   : 2 },
    /* 9 */ { "bits"    : 9, "bytes"   : 1 },
    /* 10 */ { "bits"    : 9, "bytes"   : 1 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^21 + x^19 + x^13 + x^10 + x^9 + x^7 + x^5 + x^3 + x^2 + 1",
    "degree"     : 24,
    "explicit"   : "0x12826ad",
    "koopman"    : "0x941356",
    "normal"     : "0x2826ad"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16777191, "bytes"   : 2097148 },
    /* 4 */ { "bits"    : 7497, "bytes"   : 937 },
    /* 5 */ { "bits"    : 179, "bytes"   : 22 },
    /* 6 */ { "bits"    : 127, "bytes"   : 15 },
    /* 7 */ { "bits"    : 60, "bytes"   : 7 },
    /* 8 */ { "bits"    : 48, "bytes"   : 6 },
    /* 9 */ { "bits"    : 18, "bytes"   : 2 },
    /* 10 */ { "bits"    : 11, "bytes"   : 1 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^21 + x^20 + x^16 + x^15 + x^14 + x^13 + x^12 + x^11 + x^10 + x^9 + x^8 + x^4 + x^3 + 1",
    "degree"     : 24,
    "explicit"   : "0x131ff19",
    "koopman"    : "0x98FF8C",
    "normal"     : "0x31ff19"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4073, "bytes"   : 509 },
    /* 4 */ { "bits"    : 4073, "bytes"   : 509 },
    /* 5 */ { "bits"    : 4073, "bytes"   : 509 },
    /* 6 */ { "bits"    : 228, "bytes"   : 28 },
    /* 7 */ { "bits"    : 13, "bytes"   : 1 },
    /* 8 */ { "bits"    : 9, "bytes"   : 1 },
    /* 9 */ { "bits"    : 9, "bytes"   : 1 },
    /* 10 */ { "bits"    : 9, "bytes"   : 1 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^21 + x^20 + x^17 + x^13 + x^12 + x^3 + 1",
    "degree"     : 24,
    "explicit"   : "0x1323009",
    "koopman"    : "0x991804",
    "normal"     : "0x323009"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4070, "bytes"   : 508 },
    /* 4 */ { "bits"    : 4070, "bytes"   : 508 },
    /* 5 */ { "bits"    : 2024, "bytes"   : 253 },
    /* 6 */ { "bits"    : 2024, "bytes"   : 253 },
    /* 7 */ { "bits"    : 44, "bytes"   : 5 },
    /* 8 */ { "bits"    : 44, "bytes"   : 5 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^21 + x^20 + x^17 + x^15 + x^11 + x^9 + x^8 + x^6 + x^5 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x1328b63",
    "koopman"    : "0x9945B1",
    "normal"     : "0x328b63"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388583, "bytes"   : 1048572 },
    /* 4 */ { "bits"    : 8388583, "bytes"   : 1048572 },
    /* 5 */ { "bits"    : 822, "bytes"   : 102 },
    /* 6 */ { "bits"    : 822, "bytes"   : 102 },
    /* 7 */ { "bits"    : 37, "bytes"   : 4 },
    /* 8 */ { "bits"    : 37, "bytes"   : 4 },
    /* 9 */ { "bits"    : 12, "bytes"   : 1 },
    /* 10 */ { "bits"    : 12, "bytes"   : 1 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^22 + x^12 + x^10 + x^9 + x^2 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x1401607",
    "koopman"    : "0xA00B03",
    "normal"     : "0x401607"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4070, "bytes"   : 508 },
    /* 4 */ { "bits"    : 4070, "bytes"   : 508 },
    /* 5 */ { "bits"    : 2024, "bytes"   : 253 },
    /* 6 */ { "bits"    : 2024, "bytes"   : 253 },
    /* 7 */ { "bits"    : 31, "bytes"   : 3 },
    /* 8 */ { "bits"    : 31, "bytes"   : 3 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^22 + x^18 + x^16 + x^15 + x^14 + x^11 + x^8 + x^7 + x^4 + x^3 + x^2 + 1",
    "degree"     : 24,
    "explicit"   : "0x145c99d",
    "koopman"    : "0xA2E4CE",
    "normal"     : "0x45c99d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16777191, "bytes"   : 2097148 },
    /* 4 */ { "bits"    : 2562, "bytes"   : 320 },
    /* 5 */ { "bits"    : 457, "bytes"   : 57 },
    /* 6 */ { "bits"    : 248, "bytes"   : 31 },
    /* 7 */ { "bits"    : 70, "bytes"   : 8 },
    /* 8 */ { "bits"    : 30, "bytes"   : 3 },
    /* 9 */ { "bits"    : 11, "bytes"   : 1 },
    /* 10 */ { "bits"    : 9, "bytes"   : 1 },
    /* 11 */ { "bits"    : 9, "bytes"   : 1 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^22 + x^18 + x^17 + x^15 + x^13 + x^11 + x^10 + x^7 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x146acef",
    "koopman"    : "0xA35677",
    "normal"     : "0x46acef"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16777191, "bytes"   : 2097148 },
    /* 4 */ { "bits"    : 3349, "bytes"   : 418 },
    /* 5 */ { "bits"    : 531, "bytes"   : 66 },
    /* 6 */ { "bits"    : 72, "bytes"   : 9 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^22 + x^19 + x^18 + x^17 + x^14 + x^13 + x^11 + x^9 + x^8 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x14e6b4f",
    "koopman"    : "0xA735A7",
    "normal"     : "0x4e6b4f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16777191, "bytes"   : 2097148 },
    /* 4 */ { "bits"    : 5954, "bytes"   : 744 },
    /* 5 */ { "bits"    : 259, "bytes"   : 32 },
    /* 6 */ { "bits"    : 135, "bytes"   : 16 },
    /* 7 */ { "bits"    : 29, "bytes"   : 3 },
    /* 8 */ { "bits"    : 17, "bytes"   : 2 },
    /* 9 */ { "bits"    : 15, "bytes"   : 1 },
    /* 10 */ { "bits"    : 15, "bytes"   : 1 },
    /* 11 */ { "bits"    : 15, "bytes"   : 1 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^22 + x^20 + x^19 + x^17 + x^16 + x^15 + x^14 + x^10 + x^7 + x^6 + x^5 + x^4 + x^2 + 1",
    "degree"     : 24,
    "explicit"   : "0x15bc4f5",
    "koopman"    : "0xADE27A",
    "normal"     : "0x5bc4f5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4071, "bytes"   : 508 },
    /* 4 */ { "bits"    : 4071, "bytes"   : 508 },
    /* 5 */ { "bits"    : 4071, "bytes"   : 508 },
    /* 6 */ { "bits"    : 193, "bytes"   : 24 },
    /* 7 */ { "bits"    : 53, "bytes"   : 6 },
    /* 8 */ { "bits"    : 17, "bytes"   : 2 },
    /* 9 */ { "bits"    : 11, "bytes"   : 1 },
    /* 10 */ { "bits"    : 9, "bytes"   : 1 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^22 + x^20 + x^19 + x^18 + x^16 + x^14 + x^13 + x^11 + x^10 + x^8 + x^7 + x^6 + x^3 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x15d6dcb",
    "koopman"    : "0xAEB6E5",
    "normal"     : "0x5d6dcb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4070, "bytes"   : 508 },
    /* 4 */ { "bits"    : 4070, "bytes"   : 508 },
    /* 5 */ { "bits"    : 2024, "bytes"   : 253 },
    /* 6 */ { "bits"    : 2024, "bytes"   : 253 },
    /* 7 */ { "bits"    : 71, "bytes"   : 8 },
    /* 8 */ { "bits"    : 71, "bytes"   : 8 },
    /* 9 */ { "bits"    : 17, "bytes"   : 2 },
    /* 10 */ { "bits"    : 17, "bytes"   : 2 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^22 + x^21 + x^19 + x^18 + x^17 + x^14 + x^13 + x^12 + x^11 + x^10 + x^8 + x^5 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x16e7d23",
    "koopman"    : "0xB73E91",
    "normal"     : "0x6e7d23"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 6, "bytes"   : 0 },
    /* 4 */ { "bits"    : 6, "bytes"   : 0 },
    /* 5 */ { "bits"    : 6, "bytes"   : 0 },
    /* 6 */ { "bits"    : 6, "bytes"   : 0 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^22 + x^21 + x^19 + x^18 + x^17 + x^15 + x^13 + x^12 + x^11 + x^10 + x^8 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x16ebd57",
    "koopman"    : "0xB75EAB",
    "normal"     : "0x6ebd57"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16777191, "bytes"   : 2097148 },
    /* 4 */ { "bits"    : 8310, "bytes"   : 1038 },
    /* 5 */ { "bits"    : 368, "bytes"   : 46 },
    /* 6 */ { "bits"    : 111, "bytes"   : 13 },
    /* 7 */ { "bits"    : 29, "bytes"   : 3 },
    /* 8 */ { "bits"    : 29, "bytes"   : 3 },
    /* 9 */ { "bits"    : 29, "bytes"   : 3 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^22 + x^21 + x^20 + x^15 + x^14 + x^13 + x^11 + x^9 + x^5 + x^3 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x170ea2b",
    "koopman"    : "0xB87515",
    "normal"     : "0x70ea2b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16777191, "bytes"   : 2097148 },
    /* 4 */ { "bits"    : 4821, "bytes"   : 602 },
    /* 5 */ { "bits"    : 432, "bytes"   : 54 },
    /* 6 */ { "bits"    : 88, "bytes"   : 11 },
    /* 7 */ { "bits"    : 40, "bytes"   : 5 },
    /* 8 */ { "bits"    : 31, "bytes"   : 3 },
    /* 9 */ { "bits"    : 18, "bytes"   : 2 },
    /* 10 */ { "bits"    : 12, "bytes"   : 1 },
    /* 11 */ { "bits"    : 12, "bytes"   : 1 },
    /* 12 */ { "bits"    : 12, "bytes"   : 1 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^22 + x^21 + x^20 + x^19 + x^17 + x^16 + x^8 + x^7 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 24,
    "explicit"   : "0x17b01bd",
    "koopman"    : "0xBD80DE",
    "normal"     : "0x7b01bd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4074, "bytes"   : 509 },
    /* 4 */ { "bits"    : 4074, "bytes"   : 509 },
    /* 5 */ { "bits"    : 2026, "bytes"   : 253 },
    /* 6 */ { "bits"    : 2026, "bytes"   : 253 },
    /* 7 */ { "bits"    : 59, "bytes"   : 7 },
    /* 8 */ { "bits"    : 59, "bytes"   : 7 },
    /* 9 */ { "bits"    : 12, "bytes"   : 1 },
    /* 10 */ { "bits"    : 12, "bytes"   : 1 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^22 + x^21 + x^20 + x^19 + x^17 + x^16 + x^14 + x^11 + x^8 + x^7 + x^5 + x^3 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x17b49ab",
    "koopman"    : "0xBDA4D5",
    "normal"     : "0x7b49ab"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16777191, "bytes"   : 2097148 },
    /* 4 */ { "bits"    : 10152, "bytes"   : 1269 },
    /* 5 */ { "bits"    : 323, "bytes"   : 40 },
    /* 6 */ { "bits"    : 146, "bytes"   : 18 },
    /* 7 */ { "bits"    : 43, "bytes"   : 5 },
    /* 8 */ { "bits"    : 33, "bytes"   : 4 },
    /* 9 */ { "bits"    : 19, "bytes"   : 2 },
    /* 10 */ { "bits"    : 19, "bytes"   : 2 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^23 + x^6 + x^5 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x1800063",
    "koopman"    : "0xC00031",
    "normal"     : "0x800063"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388583, "bytes"   : 1048572 },
    /* 4 */ { "bits"    : 8388583, "bytes"   : 1048572 },
    /* 5 */ { "bits"    : 4, "bytes"   : 0 },
    /* 6 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^23 + x^14 + x^12 + x^8 + 1",
    "degree"     : 24,
    "explicit"   : "0x1805101",
    "koopman"    : "0xC02880",
    "normal"     : "0x805101"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 7137, "bytes"   : 892 },
    /* 4 */ { "bits"    : 7137, "bytes"   : 892 },
    /* 5 */ { "bits"    : 1006, "bytes"   : 125 },
    /* 6 */ { "bits"    : 1006, "bytes"   : 125 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^23 + x^18 + x^17 + x^14 + x^11 + x^10 + x^7 + x^6 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x1864cfb",
    "koopman"    : "0xC3267D",
    "normal"     : "0x864cfb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8388583, "bytes"   : 1048572 },
    /* 4 */ { "bits"    : 8388583, "bytes"   : 1048572 },
    /* 5 */ { "bits"    : 517, "bytes"   : 64 },
    /* 6 */ { "bits"    : 517, "bytes"   : 64 },
    /* 7 */ { "bits"    : 30, "bytes"   : 3 },
    /* 8 */ { "bits"    : 30, "bytes"   : 3 },
    /* 9 */ { "bits"    : 9, "bytes"   : 1 },
    /* 10 */ { "bits"    : 9, "bytes"   : 1 },
    /* 11 */ { "bits"    : 3, "bytes"   : 0 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^23 + x^19 + x^18 + x^17 + x^16 + x^14 + x^12 + x^11 + x^9 + x^8 + x^4 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x18f5b13",
    "koopman"    : "0xC7AD89",
    "normal"     : "0x8f5b13"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8371178, "bytes"   : 1046397 },
    /* 4 */ { "bits"    : 8371178, "bytes"   : 1046397 },
    /* 5 */ { "bits"    : 218, "bytes"   : 27 },
    /* 6 */ { "bits"    : 218, "bytes"   : 27 },
    /* 7 */ { "bits"    : 35, "bytes"   : 4 },
    /* 8 */ { "bits"    : 35, "bytes"   : 4 },
    /* 9 */ { "bits"    : 26, "bytes"   : 3 },
    /* 10 */ { "bits"    : 26, "bytes"   : 3 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^23 + x^20 + x^18 + x^17 + x^16 + x^14 + x^11 + x^10 + x^9 + x^8 + x^3 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x1974f0b",
    "koopman"    : "0xCBA785",
    "normal"     : "0x974f0b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 484, "bytes"   : 60 },
    /* 4 */ { "bits"    : 484, "bytes"   : 60 },
    /* 5 */ { "bits"    : 105, "bytes"   : 13 },
    /* 6 */ { "bits"    : 105, "bytes"   : 13 },
    /* 7 */ { "bits"    : 105, "bytes"   : 13 },
    /* 8 */ { "bits"    : 105, "bytes"   : 13 },
    /* 9 */ { "bits"    : 9, "bytes"   : 1 },
    /* 10 */ { "bits"    : 9, "bytes"   : 1 },
    /* 11 */ { "bits"    : 9, "bytes"   : 1 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^23 + x^21 + x^20 + x^17 + x^15 + x^13 + x^12 + x^8 + x^4 + x^2 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x1b2b117",
    "koopman"    : "0xD9588B",
    "normal"     : "0xb2b117"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 28062, "bytes"   : 3507 },
    /* 4 */ { "bits"    : 5110, "bytes"   : 638 },
    /* 5 */ { "bits"    : 479, "bytes"   : 59 },
    /* 6 */ { "bits"    : 157, "bytes"   : 19 },
    /* 7 */ { "bits"    : 27, "bytes"   : 3 },
    /* 8 */ { "bits"    : 18, "bytes"   : 2 },
    /* 9 */ { "bits"    : 18, "bytes"   : 2 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^24 + x^23 + x^22 + x^20 + x^19 + x^17 + x^16 + x^13 + x^10 + x^9 + x^8 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 24,
    "explicit"   : "0x1db2777",
    "koopman"    : "0xED93BB",
    "normal"     : "0xdb2777"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 39, "bytes"   : 4 },
    /* 4 */ { "bits"    : 39, "bytes"   : 4 },
    /* 5 */ { "bits"    : 39, "bytes"   : 4 },
    /* 6 */ { "bits"    : 39, "bytes"   : 4 },
    /* 7 */ { "bits"    : 39, "bytes"   : 4 },
    /* 8 */ { "bits"    : 39, "bytes"   : 4 },
    /* 9 */ { "bits"    : 39, "bytes"   : 4 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^3 + 1",
    "degree"     : 25,
    "explicit"   : "0x2000009",
    "koopman"    : "0x1000004",
    "normal"     : "0x9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554406, "bytes"   : 4194300 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x2000037",
    "koopman"    : "0x100001B",
    "normal"     : "0x37"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2097126, "bytes"   : 262140 },
    /* 4 */ { "bits"    : 2097126, "bytes"   : 262140 },
    /* 5 */ { "bits"    : 719, "bytes"   : 89 },
    /* 6 */ { "bits"    : 719, "bytes"   : 89 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^7 + x^4 + x^2 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x2000097",
    "koopman"    : "0x100004B",
    "normal"     : "0x97"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16777190, "bytes"   : 2097148 },
    /* 4 */ { "bits"    : 16777190, "bytes"   : 2097148 },
    /* 5 */ { "bits"    : 429, "bytes"   : 53 },
    /* 6 */ { "bits"    : 429, "bytes"   : 53 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^17 + x^15 + x^14 + x^12 + x^9 + x^4 + x^3 + 1",
    "degree"     : 25,
    "explicit"   : "0x202d219",
    "koopman"    : "0x101690C",
    "normal"     : "0x2d219"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554406, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 38912, "bytes"   : 4864 },
    /* 5 */ { "bits"    : 604, "bytes"   : 75 },
    /* 6 */ { "bits"    : 128, "bytes"   : 16 },
    /* 7 */ { "bits"    : 72, "bytes"   : 9 },
    /* 8 */ { "bits"    : 13, "bytes"   : 1 },
    /* 9 */ { "bits"    : 13, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^20 + x^18 + x^17 + x^16 + x^14 + x^13 + x^12 + x^10 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x217745b",
    "koopman"    : "0x10BBA2D",
    "normal"     : "0x17745b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16777190, "bytes"   : 2097148 },
    /* 4 */ { "bits"    : 16777190, "bytes"   : 2097148 },
    /* 5 */ { "bits"    : 1059, "bytes"   : 132 },
    /* 6 */ { "bits"    : 1059, "bytes"   : 132 },
    /* 7 */ { "bits"    : 38, "bytes"   : 4 },
    /* 8 */ { "bits"    : 38, "bytes"   : 4 },
    /* 9 */ { "bits"    : 8, "bytes"   : 1 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^22 + x^19 + x^18 + x^17 + x^14 + x^12 + x^8 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x24e517f",
    "koopman"    : "0x12728BF",
    "normal"     : "0x4e517f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8371688, "bytes"   : 1046461 },
    /* 4 */ { "bits"    : 8188, "bytes"   : 1023 },
    /* 5 */ { "bits"    : 775, "bytes"   : 96 },
    /* 6 */ { "bits"    : 43, "bytes"   : 5 },
    /* 7 */ { "bits"    : 43, "bytes"   : 5 },
    /* 8 */ { "bits"    : 26, "bytes"   : 3 },
    /* 9 */ { "bits"    : 21, "bytes"   : 2 },
    /* 10 */ { "bits"    : 11, "bytes"   : 1 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^22 + x^20 + x^17 + x^13 + x^12 + x^11 + x^8 + x^7 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x252399f",
    "koopman"    : "0x1291CCF",
    "normal"     : "0x52399f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 70190, "bytes"   : 8773 },
    /* 4 */ { "bits"    : 70190, "bytes"   : 8773 },
    /* 5 */ { "bits"    : 330, "bytes"   : 41 },
    /* 6 */ { "bits"    : 330, "bytes"   : 41 },
    /* 7 */ { "bits"    : 30, "bytes"   : 3 },
    /* 8 */ { "bits"    : 30, "bytes"   : 3 },
    /* 9 */ { "bits"    : 20, "bytes"   : 2 },
    /* 10 */ { "bits"    : 20, "bytes"   : 2 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 },
    /* 14 */ { "bits"    : 7, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^22 + x^20 + x^18 + x^17 + x^8 + x^7 + x^5 + x^3 + 1",
    "degree"     : 25,
    "explicit"   : "0x25601a9",
    "koopman"    : "0x12B00D4",
    "normal"     : "0x5601a9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 40, "bytes"   : 5 },
    /* 4 */ { "bits"    : 40, "bytes"   : 5 },
    /* 5 */ { "bits"    : 40, "bytes"   : 5 },
    /* 6 */ { "bits"    : 40, "bytes"   : 5 },
    /* 7 */ { "bits"    : 40, "bytes"   : 5 },
    /* 8 */ { "bits"    : 40, "bytes"   : 5 },
    /* 9 */ { "bits"    : 40, "bytes"   : 5 },
    /* 10 */ { "bits"    : 40, "bytes"   : 5 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^22 + x^21 + x^19 + x^18 + x^16 + x^15 + x^14 + x^13 + x^12 + x^11 + x^9 + x^6 + x^5 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x26dfa63",
    "koopman"    : "0x136FD31",
    "normal"     : "0x6dfa63"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 230, "bytes"   : 28 },
    /* 4 */ { "bits"    : 230, "bytes"   : 28 },
    /* 5 */ { "bits"    : 230, "bytes"   : 28 },
    /* 6 */ { "bits"    : 230, "bytes"   : 28 },
    /* 7 */ { "bits"    : 230, "bytes"   : 28 },
    /* 8 */ { "bits"    : 230, "bytes"   : 28 },
    /* 9 */ { "bits"    : 20, "bytes"   : 2 },
    /* 10 */ { "bits"    : 20, "bytes"   : 2 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^22 + x^21 + x^20 + x^19 + x^17 + x^16 + x^14 + x^13 + x^12 + x^8 + x^6 + x^4 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x27b7153",
    "koopman"    : "0x13DB8A9",
    "normal"     : "0x7b7153"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554406, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 5940, "bytes"   : 742 },
    /* 5 */ { "bits"    : 681, "bytes"   : 85 },
    /* 6 */ { "bits"    : 103, "bytes"   : 12 },
    /* 7 */ { "bits"    : 64, "bytes"   : 8 },
    /* 8 */ { "bits"    : 35, "bytes"   : 4 },
    /* 9 */ { "bits"    : 20, "bytes"   : 2 },
    /* 10 */ { "bits"    : 10, "bytes"   : 1 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 4, "bytes"   : 0 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^23 + x^21 + x^17 + x^16 + x^13 + x^10 + x^9 + x^7 + x^5 + x^2 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x2a326a7",
    "koopman"    : "0x1519353",
    "normal"     : "0xa326a7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554406, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 8849, "bytes"   : 1106 },
    /* 5 */ { "bits"    : 563, "bytes"   : 70 },
    /* 6 */ { "bits"    : 185, "bytes"   : 23 },
    /* 7 */ { "bits"    : 64, "bytes"   : 8 },
    /* 8 */ { "bits"    : 35, "bytes"   : 4 },
    /* 9 */ { "bits"    : 23, "bytes"   : 2 },
    /* 10 */ { "bits"    : 22, "bytes"   : 2 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^23 + x^21 + x^20 + x^18 + x^17 + x^14 + x^8 + x^7 + x^6 + x^4 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x2b641d3",
    "koopman"    : "0x15B20E9",
    "normal"     : "0xb641d3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554406, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 11629, "bytes"   : 1453 },
    /* 5 */ { "bits"    : 334, "bytes"   : 41 },
    /* 6 */ { "bits"    : 166, "bytes"   : 20 },
    /* 7 */ { "bits"    : 43, "bytes"   : 5 },
    /* 8 */ { "bits"    : 34, "bytes"   : 4 },
    /* 9 */ { "bits"    : 34, "bytes"   : 4 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^23 + x^21 + x^20 + x^19 + x^18 + x^16 + x^15 + x^13 + x^11 + x^10 + x^8 + x^6 + x^4 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x2bdad53",
    "koopman"    : "0x15ED6A9",
    "normal"     : "0xbdad53"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 69, "bytes"   : 8 },
    /* 4 */ { "bits"    : 69, "bytes"   : 8 },
    /* 5 */ { "bits"    : 23, "bytes"   : 2 },
    /* 6 */ { "bits"    : 23, "bytes"   : 2 },
    /* 7 */ { "bits"    : 23, "bytes"   : 2 },
    /* 8 */ { "bits"    : 23, "bytes"   : 2 },
    /* 9 */ { "bits"    : 23, "bytes"   : 2 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 23, "bytes"   : 2 },
    /* 12 */ { "bits"    : 23, "bytes"   : 2 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^23 + x^22 + x^17 + x^16 + x^15 + x^13 + x^8 + x^2 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x2c3a107",
    "koopman"    : "0x161D083",
    "normal"     : "0xc3a107"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554406, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 7613, "bytes"   : 951 },
    /* 5 */ { "bits"    : 612, "bytes"   : 76 },
    /* 6 */ { "bits"    : 157, "bytes"   : 19 },
    /* 7 */ { "bits"    : 115, "bytes"   : 14 },
    /* 8 */ { "bits"    : 29, "bytes"   : 3 },
    /* 9 */ { "bits"    : 16, "bytes"   : 2 },
    /* 10 */ { "bits"    : 12, "bytes"   : 1 },
    /* 11 */ { "bits"    : 9, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^23 + x^22 + x^18 + x^11 + x^9 + x^7 + x^4 + x^2 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x2c40a97",
    "koopman"    : "0x162054B",
    "normal"     : "0xc40a97"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 116, "bytes"   : 14 },
    /* 4 */ { "bits"    : 116, "bytes"   : 14 },
    /* 5 */ { "bits"    : 25, "bytes"   : 3 },
    /* 6 */ { "bits"    : 25, "bytes"   : 3 },
    /* 7 */ { "bits"    : 24, "bytes"   : 3 },
    /* 8 */ { "bits"    : 24, "bytes"   : 3 },
    /* 9 */ { "bits"    : 24, "bytes"   : 3 },
    /* 10 */ { "bits"    : 24, "bytes"   : 3 },
    /* 11 */ { "bits"    : 24, "bytes"   : 3 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^23 + x^22 + x^20 + x^15 + x^13 + x^12 + x^9 + x^6 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x2d0b243",
    "koopman"    : "0x1685921",
    "normal"     : "0xd0b243"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554406, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 7086, "bytes"   : 885 },
    /* 5 */ { "bits"    : 569, "bytes"   : 71 },
    /* 6 */ { "bits"    : 136, "bytes"   : 17 },
    /* 7 */ { "bits"    : 59, "bytes"   : 7 },
    /* 8 */ { "bits"    : 36, "bytes"   : 4 },
    /* 9 */ { "bits"    : 22, "bytes"   : 2 },
    /* 10 */ { "bits"    : 16, "bytes"   : 2 },
    /* 11 */ { "bits"    : 16, "bytes"   : 2 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^23 + x^22 + x^21 + x^18 + x^17 + x^16 + x^11 + x^10 + x^9 + x^7 + x^6 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x2e70efb",
    "koopman"    : "0x173877D",
    "normal"     : "0xe70efb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554406, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 4640, "bytes"   : 580 },
    /* 5 */ { "bits"    : 707, "bytes"   : 88 },
    /* 6 */ { "bits"    : 203, "bytes"   : 25 },
    /* 7 */ { "bits"    : 92, "bytes"   : 11 },
    /* 8 */ { "bits"    : 60, "bytes"   : 7 },
    /* 9 */ { "bits"    : 12, "bytes"   : 1 },
    /* 10 */ { "bits"    : 5, "bytes"   : 0 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^23 + x^22 + x^21 + x^19 + x^15 + x^12 + x^8 + x^7 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x2e891f7",
    "koopman"    : "0x17448FB",
    "normal"     : "0xe891f7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554406, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 3930, "bytes"   : 491 },
    /* 5 */ { "bits"    : 362, "bytes"   : 45 },
    /* 6 */ { "bits"    : 120, "bytes"   : 15 },
    /* 7 */ { "bits"    : 56, "bytes"   : 7 },
    /* 8 */ { "bits"    : 45, "bytes"   : 5 },
    /* 9 */ { "bits"    : 21, "bytes"   : 2 },
    /* 10 */ { "bits"    : 12, "bytes"   : 1 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^24 + x^22 + x^19 + x^11 + x^10 + x^9 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x3480e5f",
    "koopman"    : "0x1A4072F",
    "normal"     : "0x1480e5f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554406, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 7699, "bytes"   : 962 },
    /* 5 */ { "bits"    : 422, "bytes"   : 52 },
    /* 6 */ { "bits"    : 297, "bytes"   : 37 },
    /* 7 */ { "bits"    : 86, "bytes"   : 10 },
    /* 8 */ { "bits"    : 28, "bytes"   : 3 },
    /* 9 */ { "bits"    : 21, "bytes"   : 2 },
    /* 10 */ { "bits"    : 11, "bytes"   : 1 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^24 + x^22 + x^21 + x^19 + x^15 + x^13 + x^11 + x^10 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x368ac5f",
    "koopman"    : "0x1B4562F",
    "normal"     : "0x168ac5f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554406, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 15206, "bytes"   : 1900 },
    /* 5 */ { "bits"    : 8, "bytes"   : 1 },
    /* 6 */ { "bits"    : 8, "bytes"   : 1 },
    /* 7 */ { "bits"    : 8, "bytes"   : 1 },
    /* 8 */ { "bits"    : 8, "bytes"   : 1 },
    /* 9 */ { "bits"    : 8, "bytes"   : 1 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^24 + x^22 + x^21 + x^20 + x^17 + x^13 + x^12 + x^8 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x372313b",
    "koopman"    : "0x1B9189D",
    "normal"     : "0x172313b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4072, "bytes"   : 509 },
    /* 4 */ { "bits"    : 4072, "bytes"   : 509 },
    /* 5 */ { "bits"    : 4072, "bytes"   : 509 },
    /* 6 */ { "bits"    : 4072, "bytes"   : 509 },
    /* 7 */ { "bits"    : 65, "bytes"   : 8 },
    /* 8 */ { "bits"    : 65, "bytes"   : 8 },
    /* 9 */ { "bits"    : 7, "bytes"   : 0 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 },
    /* 14 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^24 + x^23 + x^20 + x^18 + x^17 + x^16 + x^13 + x^12 + x^11 + x^10 + x^8 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 25,
    "explicit"   : "0x3973d1f",
    "koopman"    : "0x1CB9E8F",
    "normal"     : "0x1973d1f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554406, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 11039, "bytes"   : 1379 },
    /* 5 */ { "bits"    : 795, "bytes"   : 99 },
    /* 6 */ { "bits"    : 155, "bytes"   : 19 },
    /* 7 */ { "bits"    : 56, "bytes"   : 7 },
    /* 8 */ { "bits"    : 28, "bytes"   : 3 },
    /* 9 */ { "bits"    : 14, "bytes"   : 1 },
    /* 10 */ { "bits"    : 14, "bytes"   : 1 },
    /* 11 */ { "bits"    : 13, "bytes"   : 1 },
    /* 12 */ { "bits"    : 13, "bytes"   : 1 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^25 + x^24 + x^23 + x^21 + x^19 + x^18 + x^17 + x^16 + x^13 + x^10 + x^9 + x^8 + x^4 + x^3 + 1",
    "degree"     : 25,
    "explicit"   : "0x3af2719",
    "koopman"    : "0x1D7938C",
    "normal"     : "0x1af2719"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554406, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 13554, "bytes"   : 1694 },
    /* 5 */ { "bits"    : 1494, "bytes"   : 186 },
    /* 6 */ { "bits"    : 115, "bytes"   : 14 },
    /* 7 */ { "bits"    : 25, "bytes"   : 3 },
    /* 8 */ { "bits"    : 22, "bytes"   : 2 },
    /* 9 */ { "bits"    : 19, "bytes"   : 2 },
    /* 10 */ { "bits"    : 13, "bytes"   : 1 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^4 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x4000013",
    "koopman"    : "0x2000009",
    "normal"     : "0x13"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554405, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 33554405, "bytes"   : 4194300 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^6 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x4000047",
    "koopman"    : "0x2000023",
    "normal"     : "0x47"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108837, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 2577, "bytes"   : 322 },
    /* 5 */ { "bits"    : 80, "bytes"   : 10 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x4000067",
    "koopman"    : "0x2000033",
    "normal"     : "0x67"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 11173180, "bytes"   : 1396647 },
    /* 4 */ { "bits"    : 11173180, "bytes"   : 1396647 },
    /* 5 */ { "bits"    : 1041, "bytes"   : 130 },
    /* 6 */ { "bits"    : 1041, "bytes"   : 130 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^21 + x^20 + x^15 + x^14 + x^12 + x^11 + x^6 + x^5 + 1",
    "degree"     : 26,
    "explicit"   : "0x430d861",
    "koopman"    : "0x2186C30",
    "normal"     : "0x30d861"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8168, "bytes"   : 1021 },
    /* 4 */ { "bits"    : 8168, "bytes"   : 1021 },
    /* 5 */ { "bits"    : 4072, "bytes"   : 509 },
    /* 6 */ { "bits"    : 4072, "bytes"   : 509 },
    /* 7 */ { "bits"    : 74, "bytes"   : 9 },
    /* 8 */ { "bits"    : 74, "bytes"   : 9 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^22 + x^21 + x^20 + x^18 + x^17 + x^16 + x^14 + x^13 + x^11 + x^10 + x^5 + x^2 + 1",
    "degree"     : 26,
    "explicit"   : "0x4776c25",
    "koopman"    : "0x23BB612",
    "normal"     : "0x776c25"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 11141009, "bytes"   : 1392626 },
    /* 4 */ { "bits"    : 11141009, "bytes"   : 1392626 },
    /* 5 */ { "bits"    : 669, "bytes"   : 83 },
    /* 6 */ { "bits"    : 669, "bytes"   : 83 },
    /* 7 */ { "bits"    : 66, "bytes"   : 8 },
    /* 8 */ { "bits"    : 66, "bytes"   : 8 },
    /* 9 */ { "bits"    : 8, "bytes"   : 1 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^23 + x^20 + x^16 + x^15 + x^13 + x^10 + x^9 + x^8 + x^6 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 26,
    "explicit"   : "0x491a77d",
    "koopman"    : "0x248D3BE",
    "normal"     : "0x91a77d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 303, "bytes"   : 37 },
    /* 4 */ { "bits"    : 303, "bytes"   : 37 },
    /* 5 */ { "bits"    : 28, "bytes"   : 3 },
    /* 6 */ { "bits"    : 28, "bytes"   : 3 },
    /* 7 */ { "bits"    : 24, "bytes"   : 3 },
    /* 8 */ { "bits"    : 24, "bytes"   : 3 },
    /* 9 */ { "bits"    : 24, "bytes"   : 3 },
    /* 10 */ { "bits"    : 24, "bytes"   : 3 },
    /* 11 */ { "bits"    : 24, "bytes"   : 3 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^23 + x^21 + x^17 + x^16 + x^15 + x^14 + x^13 + x^11 + x^10 + x^7 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x4a3ecd7",
    "koopman"    : "0x251F66B",
    "normal"     : "0xa3ecd7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 41584, "bytes"   : 5198 },
    /* 4 */ { "bits"    : 41584, "bytes"   : 5198 },
    /* 5 */ { "bits"    : 870, "bytes"   : 108 },
    /* 6 */ { "bits"    : 870, "bytes"   : 108 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 5, "bytes"   : 0 },
    /* 16 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^23 + x^22 + x^21 + x^20 + x^16 + x^14 + x^13 + x^11 + x^8 + x^5 + x^3 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x4f1692b",
    "koopman"    : "0x278B495",
    "normal"     : "0xf1692b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 33554405, "bytes"   : 4194300 },
    /* 4 */ { "bits"    : 33554405, "bytes"   : 4194300 },
    /* 5 */ { "bits"    : 1493, "bytes"   : 186 },
    /* 6 */ { "bits"    : 1493, "bytes"   : 186 },
    /* 7 */ { "bits"    : 24, "bytes"   : 3 },
    /* 8 */ { "bits"    : 24, "bytes"   : 3 },
    /* 9 */ { "bits"    : 18, "bytes"   : 2 },
    /* 10 */ { "bits"    : 18, "bytes"   : 2 },
    /* 11 */ { "bits"    : 9, "bytes"   : 1 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 },
    /* 14 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^23 + x^22 + x^21 + x^20 + x^19 + x^18 + x^16 + x^14 + x^13 + x^11 + x^10 + x^9 + x^8 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x4fd6f67",
    "koopman"    : "0x27EB7B3",
    "normal"     : "0xfd6f67"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108837, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 15247, "bytes"   : 1905 },
    /* 5 */ { "bits"    : 210, "bytes"   : 26 },
    /* 6 */ { "bits"    : 163, "bytes"   : 20 },
    /* 7 */ { "bits"    : 71, "bytes"   : 8 },
    /* 8 */ { "bits"    : 48, "bytes"   : 6 },
    /* 9 */ { "bits"    : 11, "bytes"   : 1 },
    /* 10 */ { "bits"    : 10, "bytes"   : 1 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 },
    /* 14 */ { "bits"    : 7, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^24 + x^21 + x^16 + x^14 + x^10 + x^8 + x^7 + x^6 + x^5 + x^4 + x^2 + 1",
    "degree"     : 26,
    "explicit"   : "0x52145f5",
    "koopman"    : "0x290A2FA",
    "normal"     : "0x12145f5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108837, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 14375, "bytes"   : 1796 },
    /* 5 */ { "bits"    : 405, "bytes"   : 50 },
    /* 6 */ { "bits"    : 169, "bytes"   : 21 },
    /* 7 */ { "bits"    : 72, "bytes"   : 9 },
    /* 8 */ { "bits"    : 48, "bytes"   : 6 },
    /* 9 */ { "bits"    : 26, "bytes"   : 3 },
    /* 10 */ { "bits"    : 26, "bytes"   : 3 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^24 + x^21 + x^19 + x^16 + x^15 + x^14 + x^13 + x^11 + x^10 + x^9 + x^8 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 26,
    "explicit"   : "0x529ef3d",
    "koopman"    : "0x294F79E",
    "normal"     : "0x129ef3d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108837, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 6915, "bytes"   : 864 },
    /* 5 */ { "bits"    : 299, "bytes"   : 37 },
    /* 6 */ { "bits"    : 255, "bytes"   : 31 },
    /* 7 */ { "bits"    : 135, "bytes"   : 16 },
    /* 8 */ { "bits"    : 25, "bytes"   : 3 },
    /* 9 */ { "bits"    : 18, "bytes"   : 2 },
    /* 10 */ { "bits"    : 4, "bytes"   : 0 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^24 + x^22 + x^21 + x^20 + x^19 + x^17 + x^16 + x^12 + x^9 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x57b1277",
    "koopman"    : "0x2BD893B",
    "normal"     : "0x17b1277"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 484, "bytes"   : 60 },
    /* 4 */ { "bits"    : 484, "bytes"   : 60 },
    /* 5 */ { "bits"    : 230, "bytes"   : 28 },
    /* 6 */ { "bits"    : 230, "bytes"   : 28 },
    /* 7 */ { "bits"    : 230, "bytes"   : 28 },
    /* 8 */ { "bits"    : 230, "bytes"   : 28 },
    /* 9 */ { "bits"    : 24, "bytes"   : 3 },
    /* 10 */ { "bits"    : 24, "bytes"   : 3 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^24 + x^22 + x^21 + x^20 + x^19 + x^18 + x^17 + x^16 + x^14 + x^13 + x^12 + x^11 + x^9 + x^8 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x57f7b1f",
    "koopman"    : "0x2BFBD8F",
    "normal"     : "0x17f7b1f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 162, "bytes"   : 20 },
    /* 4 */ { "bits"    : 162, "bytes"   : 20 },
    /* 5 */ { "bits"    : 23, "bytes"   : 2 },
    /* 6 */ { "bits"    : 23, "bytes"   : 2 },
    /* 7 */ { "bits"    : 23, "bytes"   : 2 },
    /* 8 */ { "bits"    : 23, "bytes"   : 2 },
    /* 9 */ { "bits"    : 23, "bytes"   : 2 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 23, "bytes"   : 2 },
    /* 12 */ { "bits"    : 23, "bytes"   : 2 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 },
    /* 20 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^24 + x^23 + x^19 + x^15 + x^13 + x^11 + x^7 + x^3 + x^2 + 1",
    "degree"     : 26,
    "explicit"   : "0x588a88d",
    "koopman"    : "0x2C45446",
    "normal"     : "0x188a88d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8165, "bytes"   : 1020 },
    /* 4 */ { "bits"    : 8165, "bytes"   : 1020 },
    /* 5 */ { "bits"    : 8165, "bytes"   : 1020 },
    /* 6 */ { "bits"    : 328, "bytes"   : 41 },
    /* 7 */ { "bits"    : 89, "bytes"   : 11 },
    /* 8 */ { "bits"    : 32, "bytes"   : 4 },
    /* 9 */ { "bits"    : 13, "bytes"   : 1 },
    /* 10 */ { "bits"    : 13, "bytes"   : 1 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^24 + x^23 + x^21 + x^19 + x^18 + x^17 + x^16 + x^14 + x^7 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x5af40cf",
    "koopman"    : "0x2D7A067",
    "normal"     : "0x1af40cf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 20971489, "bytes"   : 2621436 },
    /* 4 */ { "bits"    : 20971489, "bytes"   : 2621436 },
    /* 5 */ { "bits"    : 574, "bytes"   : 71 },
    /* 6 */ { "bits"    : 195, "bytes"   : 24 },
    /* 7 */ { "bits"    : 73, "bytes"   : 9 },
    /* 8 */ { "bits"    : 15, "bytes"   : 1 },
    /* 9 */ { "bits"    : 14, "bytes"   : 1 },
    /* 10 */ { "bits"    : 14, "bytes"   : 1 },
    /* 11 */ { "bits"    : 9, "bytes"   : 1 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^24 + x^23 + x^21 + x^20 + x^14 + x^13 + x^12 + x^10 + x^9 + x^8 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x5b0773f",
    "koopman"    : "0x2D83B9F",
    "normal"     : "0x1b0773f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108837, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 5825, "bytes"   : 728 },
    /* 5 */ { "bits"    : 871, "bytes"   : 108 },
    /* 6 */ { "bits"    : 374, "bytes"   : 46 },
    /* 7 */ { "bits"    : 67, "bytes"   : 8 },
    /* 8 */ { "bits"    : 39, "bytes"   : 4 },
    /* 9 */ { "bits"    : 23, "bytes"   : 2 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^24 + x^23 + x^22 + x^20 + x^12 + x^11 + x^10 + x^9 + x^8 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x5d01f4f",
    "koopman"    : "0x2E80FA7",
    "normal"     : "0x1d01f4f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108837, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 6451, "bytes"   : 806 },
    /* 5 */ { "bits"    : 226, "bytes"   : 28 },
    /* 6 */ { "bits"    : 207, "bytes"   : 25 },
    /* 7 */ { "bits"    : 71, "bytes"   : 8 },
    /* 8 */ { "bits"    : 30, "bytes"   : 3 },
    /* 9 */ { "bits"    : 23, "bytes"   : 2 },
    /* 10 */ { "bits"    : 19, "bytes"   : 2 },
    /* 11 */ { "bits"    : 19, "bytes"   : 2 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^25 + x^19 + x^18 + x^16 + x^15 + x^14 + x^13 + x^12 + x^11 + x^10 + x^7 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x60dfceb",
    "koopman"    : "0x306FE75",
    "normal"     : "0x20dfceb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108837, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 2120, "bytes"   : 265 },
    /* 5 */ { "bits"    : 763, "bytes"   : 95 },
    /* 6 */ { "bits"    : 155, "bytes"   : 19 },
    /* 7 */ { "bits"    : 43, "bytes"   : 5 },
    /* 8 */ { "bits"    : 20, "bytes"   : 2 },
    /* 9 */ { "bits"    : 17, "bytes"   : 2 },
    /* 10 */ { "bits"    : 17, "bytes"   : 2 },
    /* 11 */ { "bits"    : 17, "bytes"   : 2 },
    /* 12 */ { "bits"    : 17, "bytes"   : 2 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^25 + x^21 + x^17 + x^16 + x^15 + x^14 + x^12 + x^9 + x^8 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x623d35b",
    "koopman"    : "0x311E9AD",
    "normal"     : "0x223d35b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 507847, "bytes"   : 63480 },
    /* 4 */ { "bits"    : 507847, "bytes"   : 63480 },
    /* 5 */ { "bits"    : 656, "bytes"   : 82 },
    /* 6 */ { "bits"    : 136, "bytes"   : 17 },
    /* 7 */ { "bits"    : 105, "bytes"   : 13 },
    /* 8 */ { "bits"    : 49, "bytes"   : 6 },
    /* 9 */ { "bits"    : 41, "bytes"   : 5 },
    /* 10 */ { "bits"    : 17, "bytes"   : 2 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^25 + x^22 + x^20 + x^19 + x^17 + x^16 + x^15 + x^14 + x^12 + x^11 + x^10 + x^9 + x^7 + x^6 + x^4 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x65bded3",
    "koopman"    : "0x32DEF69",
    "normal"     : "0x25bded3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 104, "bytes"   : 13 },
    /* 4 */ { "bits"    : 104, "bytes"   : 13 },
    /* 5 */ { "bits"    : 40, "bytes"   : 5 },
    /* 6 */ { "bits"    : 40, "bytes"   : 5 },
    /* 7 */ { "bits"    : 40, "bytes"   : 5 },
    /* 8 */ { "bits"    : 40, "bytes"   : 5 },
    /* 9 */ { "bits"    : 40, "bytes"   : 5 },
    /* 10 */ { "bits"    : 40, "bytes"   : 5 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^25 + x^22 + x^21 + x^20 + x^19 + x^13 + x^12 + x^9 + x^8 + x^7 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x67833df",
    "koopman"    : "0x33C19EF",
    "normal"     : "0x27833df"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108837, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 51801, "bytes"   : 6475 },
    /* 5 */ { "bits"    : 451, "bytes"   : 56 },
    /* 6 */ { "bits"    : 97, "bytes"   : 12 },
    /* 7 */ { "bits"    : 75, "bytes"   : 9 },
    /* 8 */ { "bits"    : 35, "bytes"   : 4 },
    /* 9 */ { "bits"    : 7, "bytes"   : 0 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^25 + x^23 + x^22 + x^19 + x^16 + x^14 + x^12 + x^10 + x^8 + x^7 + x^4 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x6c95597",
    "koopman"    : "0x364AACB",
    "normal"     : "0x2c95597"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108837, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 11792, "bytes"   : 1474 },
    /* 5 */ { "bits"    : 1765, "bytes"   : 220 },
    /* 6 */ { "bits"    : 155, "bytes"   : 19 },
    /* 7 */ { "bits"    : 82, "bytes"   : 10 },
    /* 8 */ { "bits"    : 24, "bytes"   : 3 },
    /* 9 */ { "bits"    : 9, "bytes"   : 1 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^25 + x^24 + x^22 + x^19 + x^16 + x^14 + x^13 + x^12 + x^11 + x^10 + x^7 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x7497c9f",
    "koopman"    : "0x3A4BE4F",
    "normal"     : "0x3497c9f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108837, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 3754, "bytes"   : 469 },
    /* 5 */ { "bits"    : 757, "bytes"   : 94 },
    /* 6 */ { "bits"    : 105, "bytes"   : 13 },
    /* 7 */ { "bits"    : 83, "bytes"   : 10 },
    /* 8 */ { "bits"    : 9, "bytes"   : 1 },
    /* 9 */ { "bits"    : 9, "bytes"   : 1 },
    /* 10 */ { "bits"    : 9, "bytes"   : 1 },
    /* 11 */ { "bits"    : 9, "bytes"   : 1 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^25 + x^24 + x^22 + x^19 + x^18 + x^15 + x^14 + x^12 + x^11 + x^10 + x^7 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x74cdc9f",
    "koopman"    : "0x3A66E4F",
    "normal"     : "0x34cdc9f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108837, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 18147, "bytes"   : 2268 },
    /* 5 */ { "bits"    : 510, "bytes"   : 63 },
    /* 6 */ { "bits"    : 115, "bytes"   : 14 },
    /* 7 */ { "bits"    : 65, "bytes"   : 8 },
    /* 8 */ { "bits"    : 44, "bytes"   : 5 },
    /* 9 */ { "bits"    : 41, "bytes"   : 5 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^25 + x^24 + x^22 + x^21 + x^19 + x^18 + x^13 + x^11 + x^7 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x76c28cf",
    "koopman"    : "0x3B61467",
    "normal"     : "0x36c28cf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108837, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 11347, "bytes"   : 1418 },
    /* 5 */ { "bits"    : 647, "bytes"   : 80 },
    /* 6 */ { "bits"    : 194, "bytes"   : 24 },
    /* 7 */ { "bits"    : 69, "bytes"   : 8 },
    /* 8 */ { "bits"    : 68, "bytes"   : 8 },
    /* 9 */ { "bits"    : 24, "bytes"   : 3 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^26 + x^25 + x^24 + x^23 + x^22 + x^20 + x^17 + x^16 + x^13 + x^9 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 26,
    "explicit"   : "0x7d32257",
    "koopman"    : "0x3E9912B",
    "normal"     : "0x3d32257"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108837, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 8355, "bytes"   : 1044 },
    /* 5 */ { "bits"    : 809, "bytes"   : 101 },
    /* 6 */ { "bits"    : 230, "bytes"   : 28 },
    /* 7 */ { "bits"    : 89, "bytes"   : 11 },
    /* 8 */ { "bits"    : 12, "bytes"   : 1 },
    /* 9 */ { "bits"    : 12, "bytes"   : 1 },
    /* 10 */ { "bits"    : 12, "bytes"   : 1 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 5, "bytes"   : 0 },
    /* 15 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^5 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0x8000023",
    "koopman"    : "0x4000011",
    "normal"     : "0x23"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108836, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 67108836, "bytes"   : 8388604 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^5 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0x8000027",
    "koopman"    : "0x4000013",
    "normal"     : "0x27"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 19511, "bytes"   : 2438 },
    /* 5 */ { "bits"    : 662, "bytes"   : 82 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^7 + x^6 + x^5 + x^3 + 1",
    "degree"     : 27,
    "explicit"   : "0x80000e9",
    "koopman"    : "0x4000074",
    "normal"     : "0xe9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67067881, "bytes"   : 8383485 },
    /* 4 */ { "bits"    : 67067881, "bytes"   : 8383485 },
    /* 5 */ { "bits"    : 1084, "bytes"   : 135 },
    /* 6 */ { "bits"    : 1084, "bytes"   : 135 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^22 + x^19 + x^17 + x^16 + x^12 + x^11 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0x84b181f",
    "koopman"    : "0x4258C0F",
    "normal"     : "0x4b181f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 161, "bytes"   : 20 },
    /* 4 */ { "bits"    : 161, "bytes"   : 20 },
    /* 5 */ { "bits"    : 24, "bytes"   : 3 },
    /* 6 */ { "bits"    : 24, "bytes"   : 3 },
    /* 7 */ { "bits"    : 24, "bytes"   : 3 },
    /* 8 */ { "bits"    : 24, "bytes"   : 3 },
    /* 9 */ { "bits"    : 23, "bytes"   : 2 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 23, "bytes"   : 2 },
    /* 12 */ { "bits"    : 23, "bytes"   : 2 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^22 + x^21 + x^20 + x^19 + x^16 + x^15 + x^13 + x^12 + x^10 + x^8 + x^7 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0x879b5db",
    "koopman"    : "0x43CDAED",
    "normal"     : "0x79b5db"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 30670, "bytes"   : 3833 },
    /* 5 */ { "bits"    : 2312, "bytes"   : 289 },
    /* 6 */ { "bits"    : 256, "bytes"   : 32 },
    /* 7 */ { "bits"    : 93, "bytes"   : 11 },
    /* 8 */ { "bits"    : 45, "bytes"   : 5 },
    /* 9 */ { "bits"    : 25, "bytes"   : 3 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^23 + x^18 + x^16 + x^13 + x^11 + x^10 + x^8 + x^3 + x^2 + 1",
    "degree"     : 27,
    "explicit"   : "0x8852d0d",
    "koopman"    : "0x4429686",
    "normal"     : "0x852d0d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 27028, "bytes"   : 3378 },
    /* 5 */ { "bits"    : 624, "bytes"   : 78 },
    /* 6 */ { "bits"    : 270, "bytes"   : 33 },
    /* 7 */ { "bits"    : 112, "bytes"   : 14 },
    /* 8 */ { "bits"    : 48, "bytes"   : 6 },
    /* 9 */ { "bits"    : 48, "bytes"   : 6 },
    /* 10 */ { "bits"    : 17, "bytes"   : 2 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^23 + x^22 + x^19 + x^17 + x^15 + x^14 + x^12 + x^9 + x^8 + x^7 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0x8cad3f7",
    "koopman"    : "0x46569FB",
    "normal"     : "0xcad3f7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 5364, "bytes"   : 670 },
    /* 5 */ { "bits"    : 969, "bytes"   : 121 },
    /* 6 */ { "bits"    : 185, "bytes"   : 23 },
    /* 7 */ { "bits"    : 69, "bytes"   : 8 },
    /* 8 */ { "bits"    : 40, "bytes"   : 5 },
    /* 9 */ { "bits"    : 34, "bytes"   : 4 },
    /* 10 */ { "bits"    : 10, "bytes"   : 1 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 5, "bytes"   : 0 },
    /* 15 */ { "bits"    : 5, "bytes"   : 0 },
    /* 16 */ { "bits"    : 5, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^23 + x^22 + x^21 + x^18 + x^16 + x^15 + x^13 + x^11 + x^5 + x^4 + x^3 + 1",
    "degree"     : 27,
    "explicit"   : "0x8e5a839",
    "koopman"    : "0x472D41C",
    "normal"     : "0xe5a839"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 10790, "bytes"   : 1348 },
    /* 5 */ { "bits"    : 1042, "bytes"   : 130 },
    /* 6 */ { "bits"    : 207, "bytes"   : 25 },
    /* 7 */ { "bits"    : 95, "bytes"   : 11 },
    /* 8 */ { "bits"    : 54, "bytes"   : 6 },
    /* 9 */ { "bits"    : 24, "bytes"   : 3 },
    /* 10 */ { "bits"    : 16, "bytes"   : 2 },
    /* 11 */ { "bits"    : 16, "bytes"   : 2 },
    /* 12 */ { "bits"    : 15, "bytes"   : 1 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^23 + x^22 + x^21 + x^19 + x^16 + x^15 + x^14 + x^13 + x^12 + x^11 + x^9 + x^7 + x^3 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0x8e9fa8f",
    "koopman"    : "0x474FD47",
    "normal"     : "0xe9fa8f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 36, "bytes"   : 4 },
    /* 4 */ { "bits"    : 36, "bytes"   : 4 },
    /* 5 */ { "bits"    : 36, "bytes"   : 4 },
    /* 6 */ { "bits"    : 36, "bytes"   : 4 },
    /* 7 */ { "bits"    : 36, "bytes"   : 4 },
    /* 8 */ { "bits"    : 36, "bytes"   : 4 },
    /* 9 */ { "bits"    : 36, "bytes"   : 4 },
    /* 10 */ { "bits"    : 36, "bytes"   : 4 },
    /* 11 */ { "bits"    : 36, "bytes"   : 4 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^24 + x^23 + x^20 + x^18 + x^17 + x^15 + x^14 + x^11 + x^9 + x^8 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0x996cb1f",
    "koopman"    : "0x4CB658F",
    "normal"     : "0x196cb1f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 993, "bytes"   : 124 },
    /* 4 */ { "bits"    : 993, "bytes"   : 124 },
    /* 5 */ { "bits"    : 230, "bytes"   : 28 },
    /* 6 */ { "bits"    : 230, "bytes"   : 28 },
    /* 7 */ { "bits"    : 230, "bytes"   : 28 },
    /* 8 */ { "bits"    : 230, "bytes"   : 28 },
    /* 9 */ { "bits"    : 26, "bytes"   : 3 },
    /* 10 */ { "bits"    : 26, "bytes"   : 3 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 5, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^24 + x^23 + x^20 + x^18 + x^17 + x^16 + x^14 + x^12 + x^11 + x^10 + x^9 + x^7 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0x9975e83",
    "koopman"    : "0x4CBAF41",
    "normal"     : "0x1975e83"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 14634, "bytes"   : 1829 },
    /* 5 */ { "bits"    : 713, "bytes"   : 89 },
    /* 6 */ { "bits"    : 274, "bytes"   : 34 },
    /* 7 */ { "bits"    : 70, "bytes"   : 8 },
    /* 8 */ { "bits"    : 54, "bytes"   : 6 },
    /* 9 */ { "bits"    : 24, "bytes"   : 3 },
    /* 10 */ { "bits"    : 17, "bytes"   : 2 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 },
    /* 14 */ { "bits"    : 7, "bytes"   : 0 },
    /* 15 */ { "bits"    : 7, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^24 + x^23 + x^22 + x^21 + x^18 + x^16 + x^15 + x^14 + x^12 + x^9 + x^8 + x^7 + x^6 + x^3 + x^2 + 1",
    "degree"     : 27,
    "explicit"   : "0x9e5d3cd",
    "koopman"    : "0x4F2E9E6",
    "normal"     : "0x1e5d3cd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 22817, "bytes"   : 2852 },
    /* 5 */ { "bits"    : 853, "bytes"   : 106 },
    /* 6 */ { "bits"    : 244, "bytes"   : 30 },
    /* 7 */ { "bits"    : 87, "bytes"   : 10 },
    /* 8 */ { "bits"    : 83, "bytes"   : 10 },
    /* 9 */ { "bits"    : 30, "bytes"   : 3 },
    /* 10 */ { "bits"    : 20, "bytes"   : 2 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^24 + x^23 + x^22 + x^21 + x^19 + x^18 + x^17 + x^12 + x^10 + x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0x9ee17b3",
    "koopman"    : "0x4F70BD9",
    "normal"     : "0x1ee17b3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 9144, "bytes"   : 1143 },
    /* 5 */ { "bits"    : 804, "bytes"   : 100 },
    /* 6 */ { "bits"    : 39, "bytes"   : 4 },
    /* 7 */ { "bits"    : 39, "bytes"   : 4 },
    /* 8 */ { "bits"    : 39, "bytes"   : 4 },
    /* 9 */ { "bits"    : 37, "bytes"   : 4 },
    /* 10 */ { "bits"    : 30, "bytes"   : 3 },
    /* 11 */ { "bits"    : 5, "bytes"   : 0 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^25 + x^21 + x^20 + x^18 + x^16 + x^15 + x^14 + x^13 + x^12 + x^11 + x^10 + x^9 + x^8 + x^5 + x^4 + x^2 + 1",
    "degree"     : 27,
    "explicit"   : "0xa35ff35",
    "koopman"    : "0x51AFF9A",
    "normal"     : "0x235ff35"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 64495907, "bytes"   : 8061988 },
    /* 4 */ { "bits"    : 64495907, "bytes"   : 8061988 },
    /* 5 */ { "bits"    : 882, "bytes"   : 110 },
    /* 6 */ { "bits"    : 882, "bytes"   : 110 },
    /* 7 */ { "bits"    : 68, "bytes"   : 8 },
    /* 8 */ { "bits"    : 68, "bytes"   : 8 },
    /* 9 */ { "bits"    : 41, "bytes"   : 5 },
    /* 10 */ { "bits"    : 41, "bytes"   : 5 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^25 + x^22 + x^17 + x^16 + x^15 + x^14 + x^13 + x^11 + x^10 + x^7 + x^4 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0xa43ec97",
    "koopman"    : "0x521F64B",
    "normal"     : "0x243ec97"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 484, "bytes"   : 60 },
    /* 4 */ { "bits"    : 484, "bytes"   : 60 },
    /* 5 */ { "bits"    : 484, "bytes"   : 60 },
    /* 6 */ { "bits"    : 484, "bytes"   : 60 },
    /* 7 */ { "bits"    : 484, "bytes"   : 60 },
    /* 8 */ { "bits"    : 63, "bytes"   : 7 },
    /* 9 */ { "bits"    : 26, "bytes"   : 3 },
    /* 10 */ { "bits"    : 14, "bytes"   : 1 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^25 + x^24 + x^19 + x^18 + x^16 + x^13 + x^11 + x^9 + x^8 + x^7 + x^6 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0xb0d2bc7",
    "koopman"    : "0x58695E3",
    "normal"     : "0x30d2bc7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 644778, "bytes"   : 80597 },
    /* 4 */ { "bits"    : 644778, "bytes"   : 80597 },
    /* 5 */ { "bits"    : 845, "bytes"   : 105 },
    /* 6 */ { "bits"    : 137, "bytes"   : 17 },
    /* 7 */ { "bits"    : 31, "bytes"   : 3 },
    /* 8 */ { "bits"    : 24, "bytes"   : 3 },
    /* 9 */ { "bits"    : 24, "bytes"   : 3 },
    /* 10 */ { "bits"    : 24, "bytes"   : 3 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 },
    /* 14 */ { "bits"    : 7, "bytes"   : 0 },
    /* 15 */ { "bits"    : 7, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^25 + x^24 + x^23 + x^22 + x^15 + x^11 + x^10 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0xbc08c6b",
    "koopman"    : "0x5E04635",
    "normal"     : "0x3c08c6b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 75090, "bytes"   : 9386 },
    /* 5 */ { "bits"    : 1050, "bytes"   : 131 },
    /* 6 */ { "bits"    : 204, "bytes"   : 25 },
    /* 7 */ { "bits"    : 43, "bytes"   : 5 },
    /* 8 */ { "bits"    : 41, "bytes"   : 5 },
    /* 9 */ { "bits"    : 28, "bytes"   : 3 },
    /* 10 */ { "bits"    : 16, "bytes"   : 2 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^26 + x^22 + x^21 + x^20 + x^16 + x^15 + x^14 + x^12 + x^8 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0xc71d12f",
    "koopman"    : "0x638E897",
    "normal"     : "0x471d12f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 27260, "bytes"   : 3407 },
    /* 5 */ { "bits"    : 653, "bytes"   : 81 },
    /* 6 */ { "bits"    : 446, "bytes"   : 55 },
    /* 7 */ { "bits"    : 91, "bytes"   : 11 },
    /* 8 */ { "bits"    : 54, "bytes"   : 6 },
    /* 9 */ { "bits"    : 29, "bytes"   : 3 },
    /* 10 */ { "bits"    : 20, "bytes"   : 2 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 4, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^26 + x^23 + x^21 + x^20 + x^18 + x^17 + x^16 + x^15 + x^13 + x^11 + x^9 + x^5 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0xcb7aa27",
    "koopman"    : "0x65BD513",
    "normal"     : "0x4b7aa27"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 22357307, "bytes"   : 2794663 },
    /* 4 */ { "bits"    : 22357307, "bytes"   : 2794663 },
    /* 5 */ { "bits"    : 6, "bytes"   : 0 },
    /* 6 */ { "bits"    : 6, "bytes"   : 0 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^26 + x^24 + x^21 + x^20 + x^15 + x^14 + x^10 + x^9 + x^5 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0xd30c627",
    "koopman"    : "0x6986313",
    "normal"     : "0x530c627"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 3942, "bytes"   : 492 },
    /* 5 */ { "bits"    : 1156, "bytes"   : 144 },
    /* 6 */ { "bits"    : 223, "bytes"   : 27 },
    /* 7 */ { "bits"    : 84, "bytes"   : 10 },
    /* 8 */ { "bits"    : 52, "bytes"   : 6 },
    /* 9 */ { "bits"    : 11, "bytes"   : 1 },
    /* 10 */ { "bits"    : 11, "bytes"   : 1 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 },
    /* 13 */ { "bits"    : 11, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^26 + x^24 + x^22 + x^18 + x^13 + x^12 + x^11 + x^10 + x^7 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0xd443c9f",
    "koopman"    : "0x6A21E4F",
    "normal"     : "0x5443c9f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 30200, "bytes"   : 3775 },
    /* 5 */ { "bits"    : 399, "bytes"   : 49 },
    /* 6 */ { "bits"    : 192, "bytes"   : 24 },
    /* 7 */ { "bits"    : 66, "bytes"   : 8 },
    /* 8 */ { "bits"    : 50, "bytes"   : 6 },
    /* 9 */ { "bits"    : 18, "bytes"   : 2 },
    /* 10 */ { "bits"    : 14, "bytes"   : 1 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^26 + x^24 + x^22 + x^19 + x^18 + x^13 + x^9 + x^8 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0xd4c237f",
    "koopman"    : "0x6A611BF",
    "normal"     : "0x54c237f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 66977254, "bytes"   : 8372156 },
    /* 4 */ { "bits"    : 66977254, "bytes"   : 8372156 },
    /* 5 */ { "bits"    : 1161, "bytes"   : 145 },
    /* 6 */ { "bits"    : 1161, "bytes"   : 145 },
    /* 7 */ { "bits"    : 64, "bytes"   : 8 },
    /* 8 */ { "bits"    : 64, "bytes"   : 8 },
    /* 9 */ { "bits"    : 16, "bytes"   : 2 },
    /* 10 */ { "bits"    : 16, "bytes"   : 2 },
    /* 11 */ { "bits"    : 9, "bytes"   : 1 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 9, "bytes"   : 1 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^26 + x^24 + x^22 + x^20 + x^19 + x^18 + x^16 + x^11 + x^7 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0xd5d08db",
    "koopman"    : "0x6AE846D",
    "normal"     : "0x55d08db"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 24977, "bytes"   : 3122 },
    /* 5 */ { "bits"    : 391, "bytes"   : 48 },
    /* 6 */ { "bits"    : 172, "bytes"   : 21 },
    /* 7 */ { "bits"    : 161, "bytes"   : 20 },
    /* 8 */ { "bits"    : 41, "bytes"   : 5 },
    /* 9 */ { "bits"    : 16, "bytes"   : 2 },
    /* 10 */ { "bits"    : 16, "bytes"   : 2 },
    /* 11 */ { "bits"    : 15, "bytes"   : 1 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^26 + x^24 + x^23 + x^18 + x^17 + x^16 + x^15 + x^14 + x^13 + x^12 + x^11 + x^10 + x^9 + x^4 + x^3 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0xd87fe1b",
    "koopman"    : "0x6C3FF0D",
    "normal"     : "0x587fe1b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8166, "bytes"   : 1020 },
    /* 4 */ { "bits"    : 8166, "bytes"   : 1020 },
    /* 5 */ { "bits"    : 8166, "bytes"   : 1020 },
    /* 6 */ { "bits"    : 8166, "bytes"   : 1020 },
    /* 7 */ { "bits"    : 86, "bytes"   : 10 },
    /* 8 */ { "bits"    : 86, "bytes"   : 10 },
    /* 9 */ { "bits"    : 16, "bytes"   : 2 },
    /* 10 */ { "bits"    : 16, "bytes"   : 2 },
    /* 11 */ { "bits"    : 1, "bytes"   : 0 },
    /* 12 */ { "bits"    : 1, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^26 + x^25 + x^23 + x^19 + x^17 + x^16 + x^15 + x^14 + x^12 + x^8 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0xe8bd17f",
    "koopman"    : "0x745E8BF",
    "normal"     : "0x68bd17f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 67108836, "bytes"   : 8388604 },
    /* 4 */ { "bits"    : 67108836, "bytes"   : 8388604 },
    /* 5 */ { "bits"    : 1785, "bytes"   : 223 },
    /* 6 */ { "bits"    : 1785, "bytes"   : 223 },
    /* 7 */ { "bits"    : 45, "bytes"   : 5 },
    /* 8 */ { "bits"    : 45, "bytes"   : 5 },
    /* 9 */ { "bits"    : 10, "bytes"   : 1 },
    /* 10 */ { "bits"    : 10, "bytes"   : 1 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^27 + x^26 + x^25 + x^23 + x^19 + x^18 + x^15 + x^11 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 27,
    "explicit"   : "0xe8c884f",
    "koopman"    : "0x7464427",
    "normal"     : "0x68c884f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217700, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 21092, "bytes"   : 2636 },
    /* 5 */ { "bits"    : 1450, "bytes"   : 181 },
    /* 6 */ { "bits"    : 185, "bytes"   : 23 },
    /* 7 */ { "bits"    : 79, "bytes"   : 9 },
    /* 8 */ { "bits"    : 30, "bytes"   : 3 },
    /* 9 */ { "bits"    : 21, "bytes"   : 2 },
    /* 10 */ { "bits"    : 21, "bytes"   : 2 },
    /* 11 */ { "bits"    : 20, "bytes"   : 2 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^3 + 1",
    "degree"     : 28,
    "explicit"   : "0x10000009",
    "koopman"    : "0x8000004",
    "normal"     : "0x9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435427, "bytes"   : 33554428 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^5 + x^2 + 1",
    "degree"     : 28,
    "explicit"   : "0x10000025",
    "koopman"    : "0x8000012",
    "normal"     : "0x25"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217699, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 134217699, "bytes"   : 16777212 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^7 + x^4 + x^3 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x1000009b",
    "koopman"    : "0x800004D",
    "normal"     : "0x9b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 100663265, "bytes"   : 12582908 },
    /* 4 */ { "bits"    : 100663265, "bytes"   : 12582908 },
    /* 5 */ { "bits"    : 1403, "bytes"   : 175 },
    /* 6 */ { "bits"    : 1403, "bytes"   : 175 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^21 + x^19 + x^18 + x^14 + x^8 + x^7 + x^6 + x^3 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x102c41cb",
    "koopman"    : "0x81620E5",
    "normal"     : "0x2c41cb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435427, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 44913, "bytes"   : 5614 },
    /* 5 */ { "bits"    : 1217, "bytes"   : 152 },
    /* 6 */ { "bits"    : 92, "bytes"   : 11 },
    /* 7 */ { "bits"    : 92, "bytes"   : 11 },
    /* 8 */ { "bits"    : 92, "bytes"   : 11 },
    /* 9 */ { "bits"    : 10, "bytes"   : 1 },
    /* 10 */ { "bits"    : 10, "bytes"   : 1 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^23 + x^22 + x^20 + x^18 + x^17 + x^15 + x^14 + x^11 + x^9 + x^7 + x^5 + x^4 + x^3 + 1",
    "degree"     : 28,
    "explicit"   : "0x10d6cab9",
    "koopman"    : "0x86B655C",
    "normal"     : "0xd6cab9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435427, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 23240, "bytes"   : 2905 },
    /* 5 */ { "bits"    : 485, "bytes"   : 60 },
    /* 6 */ { "bits"    : 217, "bytes"   : 27 },
    /* 7 */ { "bits"    : 90, "bytes"   : 11 },
    /* 8 */ { "bits"    : 31, "bytes"   : 3 },
    /* 9 */ { "bits"    : 25, "bytes"   : 3 },
    /* 10 */ { "bits"    : 19, "bytes"   : 2 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 8, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^24 + x^21 + x^19 + x^17 + x^11 + x^10 + x^7 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 28,
    "explicit"   : "0x112a0cbd",
    "koopman"    : "0x895065E",
    "normal"     : "0x12a0cbd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435427, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 25515, "bytes"   : 3189 },
    /* 5 */ { "bits"    : 2004, "bytes"   : 250 },
    /* 6 */ { "bits"    : 95, "bytes"   : 11 },
    /* 7 */ { "bits"    : 57, "bytes"   : 7 },
    /* 8 */ { "bits"    : 42, "bytes"   : 5 },
    /* 9 */ { "bits"    : 24, "bytes"   : 3 },
    /* 10 */ { "bits"    : 24, "bytes"   : 3 },
    /* 11 */ { "bits"    : 22, "bytes"   : 2 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^24 + x^22 + x^21 + x^20 + x^18 + x^14 + x^13 + x^12 + x^11 + x^9 + x^7 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x11747ad7",
    "koopman"    : "0x8BA3D6B",
    "normal"     : "0x1747ad7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435427, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 32665, "bytes"   : 4083 },
    /* 5 */ { "bits"    : 2997, "bytes"   : 374 },
    /* 6 */ { "bits"    : 151, "bytes"   : 18 },
    /* 7 */ { "bits"    : 123, "bytes"   : 15 },
    /* 8 */ { "bits"    : 62, "bytes"   : 7 },
    /* 9 */ { "bits"    : 7, "bytes"   : 0 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 4, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^25 + x^18 + x^17 + x^15 + x^14 + x^13 + x^11 + x^10 + x^3 + 1",
    "degree"     : 28,
    "explicit"   : "0x1206ec09",
    "koopman"    : "0x9037604",
    "normal"     : "0x206ec09"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16357, "bytes"   : 2044 },
    /* 4 */ { "bits"    : 16357, "bytes"   : 2044 },
    /* 5 */ { "bits"    : 16357, "bytes"   : 2044 },
    /* 6 */ { "bits"    : 488, "bytes"   : 61 },
    /* 7 */ { "bits"    : 35, "bytes"   : 4 },
    /* 8 */ { "bits"    : 35, "bytes"   : 4 },
    /* 9 */ { "bits"    : 8, "bytes"   : 1 },
    /* 10 */ { "bits"    : 8, "bytes"   : 1 },
    /* 11 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^25 + x^21 + x^20 + x^19 + x^17 + x^16 + x^15 + x^9 + x^8 + x^7 + x^6 + x^2 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x123b83c7",
    "koopman"    : "0x91DC1E3",
    "normal"     : "0x23b83c7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435427, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 112011, "bytes"   : 14001 },
    /* 5 */ { "bits"    : 851, "bytes"   : 106 },
    /* 6 */ { "bits"    : 283, "bytes"   : 35 },
    /* 7 */ { "bits"    : 116, "bytes"   : 14 },
    /* 8 */ { "bits"    : 48, "bytes"   : 6 },
    /* 9 */ { "bits"    : 41, "bytes"   : 5 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^25 + x^23 + x^21 + x^20 + x^18 + x^16 + x^15 + x^14 + x^13 + x^12 + x^11 + x^9 + x^6 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 28,
    "explicit"   : "0x12b5fa7d",
    "koopman"    : "0x95AFD3E",
    "normal"     : "0x2b5fa7d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435427, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 19899, "bytes"   : 2487 },
    /* 5 */ { "bits"    : 1143, "bytes"   : 142 },
    /* 6 */ { "bits"    : 551, "bytes"   : 68 },
    /* 7 */ { "bits"    : 111, "bytes"   : 13 },
    /* 8 */ { "bits"    : 59, "bytes"   : 7 },
    /* 9 */ { "bits"    : 19, "bytes"   : 2 },
    /* 10 */ { "bits"    : 19, "bytes"   : 2 },
    /* 11 */ { "bits"    : 9, "bytes"   : 1 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^26 + x^24 + x^23 + x^20 + x^18 + x^17 + x^15 + x^14 + x^12 + x^10 + x^8 + x^7 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x1596d5db",
    "koopman"    : "0xACB6AED",
    "normal"     : "0x596d5db"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 133954534, "bytes"   : 16744316 },
    /* 4 */ { "bits"    : 133954534, "bytes"   : 16744316 },
    /* 5 */ { "bits"    : 898, "bytes"   : 112 },
    /* 6 */ { "bits"    : 898, "bytes"   : 112 },
    /* 7 */ { "bits"    : 62, "bytes"   : 7 },
    /* 8 */ { "bits"    : 62, "bytes"   : 7 },
    /* 9 */ { "bits"    : 48, "bytes"   : 6 },
    /* 10 */ { "bits"    : 48, "bytes"   : 6 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^26 + x^24 + x^23 + x^22 + x^21 + x^19 + x^18 + x^17 + x^15 + x^12 + x^11 + x^10 + x^9 + x^8 + x^7 + x^3 + x^2 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x15ee9f8f",
    "koopman"    : "0xAF74FC7",
    "normal"     : "0x5ee9f8f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 97517354, "bytes"   : 12189669 },
    /* 4 */ { "bits"    : 97517354, "bytes"   : 12189669 },
    /* 5 */ { "bits"    : 1046, "bytes"   : 130 },
    /* 6 */ { "bits"    : 1046, "bytes"   : 130 },
    /* 7 */ { "bits"    : 81, "bytes"   : 10 },
    /* 8 */ { "bits"    : 81, "bytes"   : 10 },
    /* 9 */ { "bits"    : 28, "bytes"   : 3 },
    /* 10 */ { "bits"    : 28, "bytes"   : 3 },
    /* 11 */ { "bits"    : 12, "bytes"   : 1 },
    /* 12 */ { "bits"    : 12, "bytes"   : 1 },
    /* 13 */ { "bits"    : 11, "bytes"   : 1 },
    /* 14 */ { "bits"    : 11, "bytes"   : 1 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 },
    /* 20 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^26 + x^25 + x^20 + x^17 + x^15 + x^12 + x^10 + x^6 + x^5 + x^4 + x^3 + x^2 + 1",
    "degree"     : 28,
    "explicit"   : "0x1612947d",
    "koopman"    : "0xB094A3E",
    "normal"     : "0x612947d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 35, "bytes"   : 4 },
    /* 4 */ { "bits"    : 35, "bytes"   : 4 },
    /* 5 */ { "bits"    : 35, "bytes"   : 4 },
    /* 6 */ { "bits"    : 35, "bytes"   : 4 },
    /* 7 */ { "bits"    : 35, "bytes"   : 4 },
    /* 8 */ { "bits"    : 35, "bytes"   : 4 },
    /* 9 */ { "bits"    : 35, "bytes"   : 4 },
    /* 10 */ { "bits"    : 35, "bytes"   : 4 },
    /* 11 */ { "bits"    : 35, "bytes"   : 4 },
    /* 12 */ { "bits"    : 35, "bytes"   : 4 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^26 + x^25 + x^23 + x^20 + x^19 + x^18 + x^16 + x^15 + x^12 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x169d901f",
    "koopman"    : "0xB4EC80F",
    "normal"     : "0x69d901f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435427, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 22683, "bytes"   : 2835 },
    /* 5 */ { "bits"    : 1002, "bytes"   : 125 },
    /* 6 */ { "bits"    : 306, "bytes"   : 38 },
    /* 7 */ { "bits"    : 86, "bytes"   : 10 },
    /* 8 */ { "bits"    : 36, "bytes"   : 4 },
    /* 9 */ { "bits"    : 22, "bytes"   : 2 },
    /* 10 */ { "bits"    : 21, "bytes"   : 2 },
    /* 11 */ { "bits"    : 13, "bytes"   : 1 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 9, "bytes"   : 1 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^26 + x^25 + x^23 + x^22 + x^18 + x^16 + x^12 + x^8 + x^5 + x^4 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x16c51133",
    "koopman"    : "0xB628899",
    "normal"     : "0x6c51133"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435427, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 15847, "bytes"   : 1980 },
    /* 5 */ { "bits"    : 745, "bytes"   : 93 },
    /* 6 */ { "bits"    : 295, "bytes"   : 36 },
    /* 7 */ { "bits"    : 81, "bytes"   : 10 },
    /* 8 */ { "bits"    : 60, "bytes"   : 7 },
    /* 9 */ { "bits"    : 53, "bytes"   : 6 },
    /* 10 */ { "bits"    : 7, "bytes"   : 0 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^26 + x^25 + x^23 + x^22 + x^19 + x^18 + x^17 + x^16 + x^14 + x^13 + x^11 + x^9 + x^5 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x16cf6a23",
    "koopman"    : "0xB67B511",
    "normal"     : "0x6cf6a23"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217699, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 134217699, "bytes"   : 16777212 },
    /* 5 */ { "bits"    : 2311, "bytes"   : 288 },
    /* 6 */ { "bits"    : 2311, "bytes"   : 288 },
    /* 7 */ { "bits"    : 92, "bytes"   : 11 },
    /* 8 */ { "bits"    : 92, "bytes"   : 11 },
    /* 9 */ { "bits"    : 24, "bytes"   : 3 },
    /* 10 */ { "bits"    : 24, "bytes"   : 3 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 },
    /* 14 */ { "bits"    : 4, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^26 + x^25 + x^23 + x^22 + x^21 + x^18 + x^17 + x^16 + x^15 + x^14 + x^12 + x^9 + x^5 + x^4 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x16e7d233",
    "koopman"    : "0xB73E919",
    "normal"     : "0x6e7d233"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435427, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 17941, "bytes"   : 2242 },
    /* 5 */ { "bits"    : 1299, "bytes"   : 162 },
    /* 6 */ { "bits"    : 326, "bytes"   : 40 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 6, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^26 + x^25 + x^24 + x^21 + x^20 + x^19 + x^16 + x^15 + x^12 + x^10 + x^9 + x^7 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x173996eb",
    "koopman"    : "0xB9CCB75",
    "normal"     : "0x73996eb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 483, "bytes"   : 60 },
    /* 4 */ { "bits"    : 483, "bytes"   : 60 },
    /* 5 */ { "bits"    : 483, "bytes"   : 60 },
    /* 6 */ { "bits"    : 483, "bytes"   : 60 },
    /* 7 */ { "bits"    : 483, "bytes"   : 60 },
    /* 8 */ { "bits"    : 483, "bytes"   : 60 },
    /* 9 */ { "bits"    : 31, "bytes"   : 3 },
    /* 10 */ { "bits"    : 31, "bytes"   : 3 },
    /* 11 */ { "bits"    : 3, "bytes"   : 0 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^26 + x^25 + x^24 + x^23 + x^21 + x^15 + x^14 + x^13 + x^11 + x^7 + x^5 + x^2 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x17a0e8a7",
    "koopman"    : "0xBD07453",
    "normal"     : "0x7a0e8a7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435427, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 40233, "bytes"   : 5029 },
    /* 5 */ { "bits"    : 1065, "bytes"   : 133 },
    /* 6 */ { "bits"    : 282, "bytes"   : 35 },
    /* 7 */ { "bits"    : 192, "bytes"   : 24 },
    /* 8 */ { "bits"    : 32, "bytes"   : 4 },
    /* 9 */ { "bits"    : 23, "bytes"   : 2 },
    /* 10 */ { "bits"    : 16, "bytes"   : 2 },
    /* 11 */ { "bits"    : 14, "bytes"   : 1 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^27 + x^24 + x^23 + x^22 + x^21 + x^17 + x^13 + x^12 + x^10 + x^9 + x^8 + x^5 + x^3 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x19e2372b",
    "koopman"    : "0xCF11B95",
    "normal"     : "0x9e2372b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 134217699, "bytes"   : 16777212 },
    /* 4 */ { "bits"    : 134217699, "bytes"   : 16777212 },
    /* 5 */ { "bits"    : 769, "bytes"   : 96 },
    /* 6 */ { "bits"    : 769, "bytes"   : 96 },
    /* 7 */ { "bits"    : 54, "bytes"   : 6 },
    /* 8 */ { "bits"    : 54, "bytes"   : 6 },
    /* 9 */ { "bits"    : 9, "bytes"   : 1 },
    /* 10 */ { "bits"    : 9, "bytes"   : 1 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 8, "bytes"   : 1 },
    /* 16 */ { "bits"    : 8, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^27 + x^24 + x^23 + x^22 + x^21 + x^19 + x^18 + x^16 + x^13 + x^9 + x^8 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x19ed232f",
    "koopman"    : "0xCF69197",
    "normal"     : "0x9ed232f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435427, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 35900, "bytes"   : 4487 },
    /* 5 */ { "bits"    : 1724, "bytes"   : 215 },
    /* 6 */ { "bits"    : 210, "bytes"   : 26 },
    /* 7 */ { "bits"    : 116, "bytes"   : 14 },
    /* 8 */ { "bits"    : 42, "bytes"   : 5 },
    /* 9 */ { "bits"    : 34, "bytes"   : 4 },
    /* 10 */ { "bits"    : 21, "bytes"   : 2 },
    /* 11 */ { "bits"    : 19, "bytes"   : 2 },
    /* 12 */ { "bits"    : 19, "bytes"   : 2 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 4, "bytes"   : 0 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 },
    /* 16 */ { "bits"    : 4, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^27 + x^25 + x^21 + x^18 + x^10 + x^7 + x^3 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x1a24048b",
    "koopman"    : "0xD120245",
    "normal"     : "0xa24048b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16358, "bytes"   : 2044 },
    /* 4 */ { "bits"    : 16358, "bytes"   : 2044 },
    /* 5 */ { "bits"    : 8166, "bytes"   : 1020 },
    /* 6 */ { "bits"    : 8166, "bytes"   : 1020 },
    /* 7 */ { "bits"    : 104, "bytes"   : 13 },
    /* 8 */ { "bits"    : 104, "bytes"   : 13 },
    /* 9 */ { "bits"    : 22, "bytes"   : 2 },
    /* 10 */ { "bits"    : 22, "bytes"   : 2 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^27 + x^25 + x^24 + x^23 + x^22 + x^12 + x^10 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x1bc0144f",
    "koopman"    : "0xDE00A27",
    "normal"     : "0xbc0144f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435427, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 10170, "bytes"   : 1271 },
    /* 5 */ { "bits"    : 1075, "bytes"   : 134 },
    /* 6 */ { "bits"    : 147, "bytes"   : 18 },
    /* 7 */ { "bits"    : 115, "bytes"   : 14 },
    /* 8 */ { "bits"    : 34, "bytes"   : 4 },
    /* 9 */ { "bits"    : 34, "bytes"   : 4 },
    /* 10 */ { "bits"    : 33, "bytes"   : 4 },
    /* 11 */ { "bits"    : 16, "bytes"   : 2 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^27 + x^26 + x^24 + x^21 + x^20 + x^19 + x^17 + x^16 + x^14 + x^12 + x^11 + x^9 + x^8 + x^7 + x^4 + x^2 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x1d3b5b97",
    "koopman"    : "0xE9DADCB",
    "normal"     : "0xd3b5b97"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 15, "bytes"   : 1 },
    /* 4 */ { "bits"    : 15, "bytes"   : 1 },
    /* 5 */ { "bits"    : 15, "bytes"   : 1 },
    /* 6 */ { "bits"    : 15, "bytes"   : 1 },
    /* 7 */ { "bits"    : 15, "bytes"   : 1 },
    /* 8 */ { "bits"    : 15, "bytes"   : 1 },
    /* 9 */ { "bits"    : 15, "bytes"   : 1 },
    /* 10 */ { "bits"    : 15, "bytes"   : 1 },
    /* 11 */ { "bits"    : 15, "bytes"   : 1 },
    /* 12 */ { "bits"    : 15, "bytes"   : 1 },
    /* 13 */ { "bits"    : 15, "bytes"   : 1 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^28 + x^27 + x^26 + x^24 + x^22 + x^20 + x^18 + x^15 + x^14 + x^13 + x^10 + x^8 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 28,
    "explicit"   : "0x1d54e557",
    "koopman"    : "0xEAA72AB",
    "normal"     : "0xd54e557"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 99, "bytes"   : 12 },
    /* 4 */ { "bits"    : 99, "bytes"   : 12 },
    /* 5 */ { "bits"    : 99, "bytes"   : 12 },
    /* 6 */ { "bits"    : 99, "bytes"   : 12 },
    /* 7 */ { "bits"    : 99, "bytes"   : 12 },
    /* 8 */ { "bits"    : 99, "bytes"   : 12 },
    /* 9 */ { "bits"    : 99, "bytes"   : 12 },
    /* 10 */ { "bits"    : 28, "bytes"   : 3 },
    /* 11 */ { "bits"    : 4, "bytes"   : 0 },
    /* 12 */ { "bits"    : 4, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^2 + 1",
    "degree"     : 29,
    "explicit"   : "0x20000005",
    "koopman"    : "0x10000002",
    "normal"     : "0x5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^7 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x200000bf",
    "koopman"    : "0x1000005F",
    "normal"     : "0xbf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435426, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 268435426, "bytes"   : 33554428 },
    /* 5 */ { "bits"    : 1057, "bytes"   : 132 },
    /* 6 */ { "bits"    : 1057, "bytes"   : 132 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^8 + x^7 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x200001eb",
    "koopman"    : "0x100000F5",
    "normal"     : "0x1eb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 89478456, "bytes"   : 11184807 },
    /* 4 */ { "bits"    : 89478456, "bytes"   : 11184807 },
    /* 5 */ { "bits"    : 2193, "bytes"   : 274 },
    /* 6 */ { "bits"    : 2193, "bytes"   : 274 },
    /* 7 */ { "bits"    : 4, "bytes"   : 0 },
    /* 8 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^23 + x^21 + x^19 + x^18 + x^17 + x^16 + x^15 + x^12 + x^9 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x20af9237",
    "koopman"    : "0x1057C91B",
    "normal"     : "0xaf9237"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 19053, "bytes"   : 2381 },
    /* 5 */ { "bits"    : 1463, "bytes"   : 182 },
    /* 6 */ { "bits"    : 288, "bytes"   : 36 },
    /* 7 */ { "bits"    : 100, "bytes"   : 12 },
    /* 8 */ { "bits"    : 45, "bytes"   : 5 },
    /* 9 */ { "bits"    : 45, "bytes"   : 5 },
    /* 10 */ { "bits"    : 20, "bytes"   : 2 },
    /* 11 */ { "bits"    : 12, "bytes"   : 1 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 9, "bytes"   : 1 },
    /* 15 */ { "bits"    : 9, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^24 + x^23 + x^22 + x^19 + x^18 + x^17 + x^11 + x^10 + x^7 + x^6 + x^5 + x^3 + x^2 + 1",
    "degree"     : 29,
    "explicit"   : "0x21ce0ced",
    "koopman"    : "0x10E70676",
    "normal"     : "0x1ce0ced"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 83259, "bytes"   : 10407 },
    /* 5 */ { "bits"    : 1264, "bytes"   : 158 },
    /* 6 */ { "bits"    : 145, "bytes"   : 18 },
    /* 7 */ { "bits"    : 80, "bytes"   : 10 },
    /* 8 */ { "bits"    : 77, "bytes"   : 9 },
    /* 9 */ { "bits"    : 62, "bytes"   : 7 },
    /* 10 */ { "bits"    : 27, "bytes"   : 3 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^25 + x^22 + x^20 + x^18 + x^17 + x^16 + x^13 + x^11 + x^9 + x^8 + x^6 + x^4 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x22572b53",
    "koopman"    : "0x112B95A9",
    "normal"     : "0x2572b53"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 43878, "bytes"   : 5484 },
    /* 5 */ { "bits"    : 1996, "bytes"   : 249 },
    /* 6 */ { "bits"    : 298, "bytes"   : 37 },
    /* 7 */ { "bits"    : 109, "bytes"   : 13 },
    /* 8 */ { "bits"    : 68, "bytes"   : 8 },
    /* 9 */ { "bits"    : 38, "bytes"   : 4 },
    /* 10 */ { "bits"    : 27, "bytes"   : 3 },
    /* 11 */ { "bits"    : 18, "bytes"   : 2 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 },
    /* 13 */ { "bits"    : 10, "bytes"   : 1 },
    /* 14 */ { "bits"    : 10, "bytes"   : 1 },
    /* 15 */ { "bits"    : 5, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^25 + x^24 + x^23 + x^19 + x^16 + x^15 + x^13 + x^12 + x^11 + x^10 + x^9 + x^8 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x2389bf6b",
    "koopman"    : "0x11C4DFB5",
    "normal"     : "0x389bf6b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268435426, "bytes"   : 33554428 },
    /* 4 */ { "bits"    : 268435426, "bytes"   : 33554428 },
    /* 5 */ { "bits"    : 2859, "bytes"   : 357 },
    /* 6 */ { "bits"    : 2859, "bytes"   : 357 },
    /* 7 */ { "bits"    : 116, "bytes"   : 14 },
    /* 8 */ { "bits"    : 116, "bytes"   : 14 },
    /* 9 */ { "bits"    : 30, "bytes"   : 3 },
    /* 10 */ { "bits"    : 30, "bytes"   : 3 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 },
    /* 16 */ { "bits"    : 4, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^25 + x^24 + x^23 + x^22 + x^21 + x^19 + x^17 + x^15 + x^7 + x^6 + x^2 + 1",
    "degree"     : 29,
    "explicit"   : "0x23ea80c5",
    "koopman"    : "0x11F54062",
    "normal"     : "0x3ea80c5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 11794, "bytes"   : 1474 },
    /* 5 */ { "bits"    : 1940, "bytes"   : 242 },
    /* 6 */ { "bits"    : 656, "bytes"   : 82 },
    /* 7 */ { "bits"    : 116, "bytes"   : 14 },
    /* 8 */ { "bits"    : 40, "bytes"   : 5 },
    /* 9 */ { "bits"    : 25, "bytes"   : 3 },
    /* 10 */ { "bits"    : 13, "bytes"   : 1 },
    /* 11 */ { "bits"    : 13, "bytes"   : 1 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^26 + x^21 + x^20 + x^18 + x^17 + x^16 + x^13 + x^12 + x^10 + x^9 + x^8 + x^7 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x243737f7",
    "koopman"    : "0x121B9BFB",
    "normal"     : "0x43737f7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 11272, "bytes"   : 1409 },
    /* 5 */ { "bits"    : 2280, "bytes"   : 285 },
    /* 6 */ { "bits"    : 343, "bytes"   : 42 },
    /* 7 */ { "bits"    : 108, "bytes"   : 13 },
    /* 8 */ { "bits"    : 41, "bytes"   : 5 },
    /* 9 */ { "bits"    : 40, "bytes"   : 5 },
    /* 10 */ { "bits"    : 39, "bytes"   : 4 },
    /* 11 */ { "bits"    : 9, "bytes"   : 1 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 5, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^26 + x^22 + x^21 + x^19 + x^16 + x^14 + x^12 + x^11 + x^8 + x^7 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x246959f7",
    "koopman"    : "0x1234ACFB",
    "normal"     : "0x46959f7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 69997, "bytes"   : 8749 },
    /* 5 */ { "bits"    : 1050, "bytes"   : 131 },
    /* 6 */ { "bits"    : 423, "bytes"   : 52 },
    /* 7 */ { "bits"    : 102, "bytes"   : 12 },
    /* 8 */ { "bits"    : 51, "bytes"   : 6 },
    /* 9 */ { "bits"    : 34, "bytes"   : 4 },
    /* 10 */ { "bits"    : 12, "bytes"   : 1 },
    /* 11 */ { "bits"    : 12, "bytes"   : 1 },
    /* 12 */ { "bits"    : 12, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 5, "bytes"   : 0 },
    /* 17 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^26 + x^24 + x^23 + x^22 + x^19 + x^18 + x^17 + x^15 + x^14 + x^13 + x^12 + x^11 + x^8 + x^7 + x^3 + x^2 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x25cef98f",
    "koopman"    : "0x12E77CC7",
    "normal"     : "0x5cef98f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 14946, "bytes"   : 1868 },
    /* 5 */ { "bits"    : 3770, "bytes"   : 471 },
    /* 6 */ { "bits"    : 283, "bytes"   : 35 },
    /* 7 */ { "bits"    : 100, "bytes"   : 12 },
    /* 8 */ { "bits"    : 76, "bytes"   : 9 },
    /* 9 */ { "bits"    : 45, "bytes"   : 5 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^26 + x^24 + x^23 + x^22 + x^20 + x^16 + x^14 + x^13 + x^11 + x^9 + x^8 + x^6 + x^5 + x^3 + x^2 + 1",
    "degree"     : 29,
    "explicit"   : "0x25d16b6d",
    "koopman"    : "0x12E8B5B6",
    "normal"     : "0x5d16b6d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1504, "bytes"   : 188 },
    /* 4 */ { "bits"    : 1504, "bytes"   : 188 },
    /* 5 */ { "bits"    : 485, "bytes"   : 60 },
    /* 6 */ { "bits"    : 485, "bytes"   : 60 },
    /* 7 */ { "bits"    : 484, "bytes"   : 60 },
    /* 8 */ { "bits"    : 54, "bytes"   : 6 },
    /* 9 */ { "bits"    : 39, "bytes"   : 4 },
    /* 10 */ { "bits"    : 10, "bytes"   : 1 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^26 + x^24 + x^23 + x^22 + x^21 + x^20 + x^19 + x^18 + x^17 + x^14 + x^13 + x^12 + x^9 + x^6 + x^5 + x^4 + x^2 + 1",
    "degree"     : 29,
    "explicit"   : "0x25fe7275",
    "koopman"    : "0x12FF393A",
    "normal"     : "0x5fe7275"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 22282126, "bytes"   : 2785265 },
    /* 4 */ { "bits"    : 14822, "bytes"   : 1852 },
    /* 5 */ { "bits"    : 1863, "bytes"   : 232 },
    /* 6 */ { "bits"    : 443, "bytes"   : 55 },
    /* 7 */ { "bits"    : 151, "bytes"   : 18 },
    /* 8 */ { "bits"    : 57, "bytes"   : 7 },
    /* 9 */ { "bits"    : 16, "bytes"   : 2 },
    /* 10 */ { "bits"    : 11, "bytes"   : 1 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 9, "bytes"   : 1 },
    /* 15 */ { "bits"    : 9, "bytes"   : 1 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^26 + x^25 + x^21 + x^15 + x^14 + x^13 + x^10 + x^8 + x^4 + x^3 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x2620e51b",
    "koopman"    : "0x1310728D",
    "normal"     : "0x620e51b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 34201, "bytes"   : 4275 },
    /* 5 */ { "bits"    : 1867, "bytes"   : 233 },
    /* 6 */ { "bits"    : 240, "bytes"   : 30 },
    /* 7 */ { "bits"    : 226, "bytes"   : 28 },
    /* 8 */ { "bits"    : 55, "bytes"   : 6 },
    /* 9 */ { "bits"    : 44, "bytes"   : 5 },
    /* 10 */ { "bits"    : 15, "bytes"   : 1 },
    /* 11 */ { "bits"    : 13, "bytes"   : 1 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^26 + x^25 + x^24 + x^22 + x^19 + x^15 + x^14 + x^11 + x^10 + x^9 + x^7 + x^5 + x^3 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x2748ceab",
    "koopman"    : "0x13A46755",
    "normal"     : "0x748ceab"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 993, "bytes"   : 124 },
    /* 4 */ { "bits"    : 993, "bytes"   : 124 },
    /* 5 */ { "bits"    : 483, "bytes"   : 60 },
    /* 6 */ { "bits"    : 483, "bytes"   : 60 },
    /* 7 */ { "bits"    : 483, "bytes"   : 60 },
    /* 8 */ { "bits"    : 483, "bytes"   : 60 },
    /* 9 */ { "bits"    : 44, "bytes"   : 5 },
    /* 10 */ { "bits"    : 44, "bytes"   : 5 },
    /* 11 */ { "bits"    : 18, "bytes"   : 2 },
    /* 12 */ { "bits"    : 18, "bytes"   : 2 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 5, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^26 + x^25 + x^24 + x^22 + x^19 + x^18 + x^16 + x^15 + x^14 + x^13 + x^11 + x^10 + x^7 + x^5 + x^4 + x^3 + 1",
    "degree"     : 29,
    "explicit"   : "0x274decb9",
    "koopman"    : "0x13A6F65C",
    "normal"     : "0x74decb9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 14, "bytes"   : 1 },
    /* 4 */ { "bits"    : 14, "bytes"   : 1 },
    /* 5 */ { "bits"    : 14, "bytes"   : 1 },
    /* 6 */ { "bits"    : 14, "bytes"   : 1 },
    /* 7 */ { "bits"    : 14, "bytes"   : 1 },
    /* 8 */ { "bits"    : 14, "bytes"   : 1 },
    /* 9 */ { "bits"    : 14, "bytes"   : 1 },
    /* 10 */ { "bits"    : 14, "bytes"   : 1 },
    /* 11 */ { "bits"    : 14, "bytes"   : 1 },
    /* 12 */ { "bits"    : 14, "bytes"   : 1 },
    /* 13 */ { "bits"    : 14, "bytes"   : 1 },
    /* 14 */ { "bits"    : 14, "bytes"   : 1 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 },
    /* 17 */ { "bits"    : 3, "bytes"   : 0 },
    /* 18 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^27 + x^22 + x^19 + x^17 + x^11 + x^10 + x^9 + x^8 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x284a0f77",
    "koopman"    : "0x142507BB",
    "normal"     : "0x84a0f77"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 17116, "bytes"   : 2139 },
    /* 5 */ { "bits"    : 1150, "bytes"   : 143 },
    /* 6 */ { "bits"    : 288, "bytes"   : 36 },
    /* 7 */ { "bits"    : 106, "bytes"   : 13 },
    /* 8 */ { "bits"    : 67, "bytes"   : 8 },
    /* 9 */ { "bits"    : 21, "bytes"   : 2 },
    /* 10 */ { "bits"    : 17, "bytes"   : 2 },
    /* 11 */ { "bits"    : 15, "bytes"   : 1 },
    /* 12 */ { "bits"    : 13, "bytes"   : 1 },
    /* 13 */ { "bits"    : 13, "bytes"   : 1 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^27 + x^25 + x^24 + x^23 + x^22 + x^17 + x^15 + x^14 + x^11 + x^9 + x^8 + x^6 + x^3 + x^2 + 1",
    "degree"     : 29,
    "explicit"   : "0x2bc2cb4d",
    "koopman"    : "0x15E165A6",
    "normal"     : "0xbc2cb4d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 268394468, "bytes"   : 33549308 },
    /* 4 */ { "bits"    : 268394468, "bytes"   : 33549308 },
    /* 5 */ { "bits"    : 1038, "bytes"   : 129 },
    /* 6 */ { "bits"    : 1038, "bytes"   : 129 },
    /* 7 */ { "bits"    : 82, "bytes"   : 10 },
    /* 8 */ { "bits"    : 82, "bytes"   : 10 },
    /* 9 */ { "bits"    : 9, "bytes"   : 1 },
    /* 10 */ { "bits"    : 9, "bytes"   : 1 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 8, "bytes"   : 1 },
    /* 16 */ { "bits"    : 8, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^27 + x^26 + x^24 + x^23 + x^21 + x^20 + x^19 + x^18 + x^17 + x^16 + x^14 + x^13 + x^12 + x^11 + x^10 + x^9 + x^7 + x^5 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x2dbf7ea3",
    "koopman"    : "0x16DFBF51",
    "normal"     : "0xdbf7ea3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 156945, "bytes"   : 19618 },
    /* 5 */ { "bits"    : 1567, "bytes"   : 195 },
    /* 6 */ { "bits"    : 280, "bytes"   : 35 },
    /* 7 */ { "bits"    : 67, "bytes"   : 8 },
    /* 8 */ { "bits"    : 62, "bytes"   : 7 },
    /* 9 */ { "bits"    : 43, "bytes"   : 5 },
    /* 10 */ { "bits"    : 19, "bytes"   : 2 },
    /* 11 */ { "bits"    : 15, "bytes"   : 1 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 5, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 },
    /* 20 */ { "bits"    : 1, "bytes"   : 0 },
    /* 21 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^27 + x^26 + x^25 + x^22 + x^21 + x^20 + x^19 + x^18 + x^17 + x^15 + x^14 + x^12 + x^11 + x^10 + x^9 + x^6 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x2e7ede43",
    "koopman"    : "0x173F6F21",
    "normal"     : "0xe7ede43"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 15530, "bytes"   : 1941 },
    /* 5 */ { "bits"    : 1383, "bytes"   : 172 },
    /* 6 */ { "bits"    : 312, "bytes"   : 39 },
    /* 7 */ { "bits"    : 137, "bytes"   : 17 },
    /* 8 */ { "bits"    : 46, "bytes"   : 5 },
    /* 9 */ { "bits"    : 32, "bytes"   : 4 },
    /* 10 */ { "bits"    : 28, "bytes"   : 3 },
    /* 11 */ { "bits"    : 27, "bytes"   : 3 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 },
    /* 14 */ { "bits"    : 7, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^27 + x^26 + x^25 + x^23 + x^21 + x^15 + x^13 + x^12 + x^6 + x^5 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x2ea0b063",
    "koopman"    : "0x17505831",
    "normal"     : "0xea0b063"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 28734, "bytes"   : 3591 },
    /* 5 */ { "bits"    : 1199, "bytes"   : 149 },
    /* 6 */ { "bits"    : 265, "bytes"   : 33 },
    /* 7 */ { "bits"    : 118, "bytes"   : 14 },
    /* 8 */ { "bits"    : 108, "bytes"   : 13 },
    /* 9 */ { "bits"    : 23, "bytes"   : 2 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 },
    /* 13 */ { "bits"    : 10, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^28 + x^26 + x^23 + x^20 + x^18 + x^16 + x^13 + x^12 + x^11 + x^8 + x^7 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x349539db",
    "koopman"    : "0x1A4A9CED",
    "normal"     : "0x149539db"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870882, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 16252, "bytes"   : 2031 },
    /* 5 */ { "bits"    : 1219, "bytes"   : 152 },
    /* 6 */ { "bits"    : 302, "bytes"   : 37 },
    /* 7 */ { "bits"    : 61, "bytes"   : 7 },
    /* 8 */ { "bits"    : 59, "bytes"   : 7 },
    /* 9 */ { "bits"    : 41, "bytes"   : 5 },
    /* 10 */ { "bits"    : 22, "bytes"   : 2 },
    /* 11 */ { "bits"    : 20, "bytes"   : 2 },
    /* 12 */ { "bits"    : 20, "bytes"   : 2 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 },
    /* 17 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^28 + x^27 + x^22 + x^19 + x^18 + x^17 + x^16 + x^14 + x^13 + x^12 + x^11 + x^9 + x^8 + x^4 + x^2 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x384f7b17",
    "koopman"    : "0x1C27BD8B",
    "normal"     : "0x184f7b17"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 97, "bytes"   : 12 },
    /* 4 */ { "bits"    : 97, "bytes"   : 12 },
    /* 5 */ { "bits"    : 35, "bytes"   : 4 },
    /* 6 */ { "bits"    : 35, "bytes"   : 4 },
    /* 7 */ { "bits"    : 35, "bytes"   : 4 },
    /* 8 */ { "bits"    : 35, "bytes"   : 4 },
    /* 9 */ { "bits"    : 35, "bytes"   : 4 },
    /* 10 */ { "bits"    : 35, "bytes"   : 4 },
    /* 11 */ { "bits"    : 35, "bytes"   : 4 },
    /* 12 */ { "bits"    : 35, "bytes"   : 4 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 5, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^28 + x^27 + x^24 + x^23 + x^22 + x^21 + x^19 + x^16 + x^13 + x^10 + x^8 + x^7 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x39e925e7",
    "koopman"    : "0x1CF492F3",
    "normal"     : "0x19e925e7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 16356, "bytes"   : 2044 },
    /* 4 */ { "bits"    : 16356, "bytes"   : 2044 },
    /* 5 */ { "bits"    : 16356, "bytes"   : 2044 },
    /* 6 */ { "bits"    : 16356, "bytes"   : 2044 },
    /* 7 */ { "bits"    : 66, "bytes"   : 8 },
    /* 8 */ { "bits"    : 66, "bytes"   : 8 },
    /* 9 */ { "bits"    : 26, "bytes"   : 3 },
    /* 10 */ { "bits"    : 26, "bytes"   : 3 },
    /* 11 */ { "bits"    : 12, "bytes"   : 1 },
    /* 12 */ { "bits"    : 12, "bytes"   : 1 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^29 + x^28 + x^27 + x^26 + x^21 + x^19 + x^17 + x^12 + x^10 + x^8 + x^3 + x^2 + x^1 + 1",
    "degree"     : 29,
    "explicit"   : "0x3c2a150f",
    "koopman"    : "0x1E150A87",
    "normal"     : "0x1c2a150f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 100, "bytes"   : 12 },
    /* 4 */ { "bits"    : 100, "bytes"   : 12 },
    /* 5 */ { "bits"    : 100, "bytes"   : 12 },
    /* 6 */ { "bits"    : 100, "bytes"   : 12 },
    /* 7 */ { "bits"    : 100, "bytes"   : 12 },
    /* 8 */ { "bits"    : 100, "bytes"   : 12 },
    /* 9 */ { "bits"    : 100, "bytes"   : 12 },
    /* 10 */ { "bits"    : 100, "bytes"   : 12 },
    /* 11 */ { "bits"    : 18, "bytes"   : 2 },
    /* 12 */ { "bits"    : 18, "bytes"   : 2 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x4000002f",
    "koopman"    : "0x20000017",
    "normal"     : "0x2f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870881, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 536870881, "bytes"   : 67108860 },
    /* 5 */ { "bits"    : 1225, "bytes"   : 153 },
    /* 6 */ { "bits"    : 1225, "bytes"   : 153 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^6 + x^4 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x40000053",
    "koopman"    : "0x20000029",
    "normal"     : "0x53"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 12003, "bytes"   : 1500 },
    /* 5 */ { "bits"    : 1899, "bytes"   : 237 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^7 + x^5 + x^4 + x^3 + 1",
    "degree"     : 30,
    "explicit"   : "0x400000b9",
    "koopman"    : "0x2000005C",
    "normal"     : "0xb9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870881, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 536870881, "bytes"   : 67108860 },
    /* 5 */ { "bits"    : 2533, "bytes"   : 316 },
    /* 6 */ { "bits"    : 2533, "bytes"   : 316 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^21 + x^19 + x^18 + x^17 + x^16 + x^15 + x^14 + x^12 + x^11 + x^9 + x^7 + x^6 + x^4 + x^2 + 1",
    "degree"     : 30,
    "explicit"   : "0x402fdad5",
    "koopman"    : "0x2017ED6A",
    "normal"     : "0x2fdad5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1503, "bytes"   : 187 },
    /* 4 */ { "bits"    : 1503, "bytes"   : 187 },
    /* 5 */ { "bits"    : 484, "bytes"   : 60 },
    /* 6 */ { "bits"    : 484, "bytes"   : 60 },
    /* 7 */ { "bits"    : 483, "bytes"   : 60 },
    /* 8 */ { "bits"    : 483, "bytes"   : 60 },
    /* 9 */ { "bits"    : 41, "bytes"   : 5 },
    /* 10 */ { "bits"    : 41, "bytes"   : 5 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^24 + x^22 + x^21 + x^18 + x^17 + x^14 + x^13 + x^12 + x^11 + x^7 + x^4 + 1",
    "degree"     : 30,
    "explicit"   : "0x41667891",
    "koopman"    : "0x20B33C48",
    "normal"     : "0x1667891"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 66878, "bytes"   : 8359 },
    /* 5 */ { "bits"    : 1308, "bytes"   : 163 },
    /* 6 */ { "bits"    : 558, "bytes"   : 69 },
    /* 7 */ { "bits"    : 121, "bytes"   : 15 },
    /* 8 */ { "bits"    : 76, "bytes"   : 9 },
    /* 9 */ { "bits"    : 36, "bytes"   : 4 },
    /* 10 */ { "bits"    : 32, "bytes"   : 4 },
    /* 11 */ { "bits"    : 30, "bytes"   : 3 },
    /* 12 */ { "bits"    : 12, "bytes"   : 1 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^26 + x^22 + x^21 + x^18 + x^14 + x^11 + x^9 + x^7 + x^6 + x^5 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x44644ae3",
    "koopman"    : "0x22322571",
    "normal"     : "0x4644ae3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 5271, "bytes"   : 658 },
    /* 5 */ { "bits"    : 614, "bytes"   : 76 },
    /* 6 */ { "bits"    : 272, "bytes"   : 34 },
    /* 7 */ { "bits"    : 146, "bytes"   : 18 },
    /* 8 */ { "bits"    : 58, "bytes"   : 7 },
    /* 9 */ { "bits"    : 44, "bytes"   : 5 },
    /* 10 */ { "bits"    : 44, "bytes"   : 5 },
    /* 11 */ { "bits"    : 19, "bytes"   : 2 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^26 + x^23 + x^21 + x^19 + x^14 + x^13 + x^10 + x^8 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x44a8653b",
    "koopman"    : "0x2254329D",
    "normal"     : "0x4a8653b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870881, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 536870881, "bytes"   : 67108860 },
    /* 5 */ { "bits"    : 3769, "bytes"   : 471 },
    /* 6 */ { "bits"    : 3769, "bytes"   : 471 },
    /* 7 */ { "bits"    : 99, "bytes"   : 12 },
    /* 8 */ { "bits"    : 99, "bytes"   : 12 },
    /* 9 */ { "bits"    : 44, "bytes"   : 5 },
    /* 10 */ { "bits"    : 44, "bytes"   : 5 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^26 + x^24 + x^21 + x^20 + x^19 + x^17 + x^16 + x^15 + x^14 + x^13 + x^9 + x^8 + x^6 + x^4 + x^3 + 1",
    "degree"     : 30,
    "explicit"   : "0x453be359",
    "koopman"    : "0x229DF1AC",
    "normal"     : "0x53be359"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 153391659, "bytes"   : 19173957 },
    /* 4 */ { "bits"    : 54693, "bytes"   : 6836 },
    /* 5 */ { "bits"    : 961, "bytes"   : 120 },
    /* 6 */ { "bits"    : 243, "bytes"   : 30 },
    /* 7 */ { "bits"    : 138, "bytes"   : 17 },
    /* 8 */ { "bits"    : 73, "bytes"   : 9 },
    /* 9 */ { "bits"    : 46, "bytes"   : 5 },
    /* 10 */ { "bits"    : 22, "bytes"   : 2 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 },
    /* 13 */ { "bits"    : 10, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 7, "bytes"   : 0 },
    /* 16 */ { "bits"    : 5, "bytes"   : 0 },
    /* 17 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^26 + x^25 + x^21 + x^18 + x^17 + x^15 + x^14 + x^12 + x^11 + x^10 + x^7 + x^5 + x^3 + x^2 + 1",
    "degree"     : 30,
    "explicit"   : "0x4626dcad",
    "koopman"    : "0x23136E56",
    "normal"     : "0x626dcad"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 11176590, "bytes"   : 1397073 },
    /* 4 */ { "bits"    : 11176590, "bytes"   : 1397073 },
    /* 5 */ { "bits"    : 1550, "bytes"   : 193 },
    /* 6 */ { "bits"    : 1550, "bytes"   : 193 },
    /* 7 */ { "bits"    : 83, "bytes"   : 10 },
    /* 8 */ { "bits"    : 83, "bytes"   : 10 },
    /* 9 */ { "bits"    : 27, "bytes"   : 3 },
    /* 10 */ { "bits"    : 27, "bytes"   : 3 },
    /* 11 */ { "bits"    : 23, "bytes"   : 2 },
    /* 12 */ { "bits"    : 23, "bytes"   : 2 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 9, "bytes"   : 1 },
    /* 15 */ { "bits"    : 9, "bytes"   : 1 },
    /* 16 */ { "bits"    : 9, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^26 + x^25 + x^23 + x^22 + x^20 + x^17 + x^16 + x^10 + x^8 + x^7 + x^6 + x^2 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x46d305c7",
    "koopman"    : "0x236982E3",
    "normal"     : "0x6d305c7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 49379, "bytes"   : 6172 },
    /* 5 */ { "bits"    : 869, "bytes"   : 108 },
    /* 6 */ { "bits"    : 444, "bytes"   : 55 },
    /* 7 */ { "bits"    : 118, "bytes"   : 14 },
    /* 8 */ { "bits"    : 72, "bytes"   : 9 },
    /* 9 */ { "bits"    : 33, "bytes"   : 4 },
    /* 10 */ { "bits"    : 25, "bytes"   : 3 },
    /* 11 */ { "bits"    : 19, "bytes"   : 2 },
    /* 12 */ { "bits"    : 15, "bytes"   : 1 },
    /* 13 */ { "bits"    : 11, "bytes"   : 1 },
    /* 14 */ { "bits"    : 10, "bytes"   : 1 },
    /* 15 */ { "bits"    : 10, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^27 + x^22 + x^20 + x^19 + x^11 + x^10 + x^8 + x^3 + 1",
    "degree"     : 30,
    "explicit"   : "0x48580d09",
    "koopman"    : "0x242C0684",
    "normal"     : "0x8580d09"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 228, "bytes"   : 28 },
    /* 4 */ { "bits"    : 228, "bytes"   : 28 },
    /* 5 */ { "bits"    : 100, "bytes"   : 12 },
    /* 6 */ { "bits"    : 100, "bytes"   : 12 },
    /* 7 */ { "bits"    : 100, "bytes"   : 12 },
    /* 8 */ { "bits"    : 100, "bytes"   : 12 },
    /* 9 */ { "bits"    : 100, "bytes"   : 12 },
    /* 10 */ { "bits"    : 100, "bytes"   : 12 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^27 + x^23 + x^22 + x^20 + x^16 + x^15 + x^11 + x^10 + x^8 + x^5 + x^4 + x^3 + 1",
    "degree"     : 30,
    "explicit"   : "0x48d18d39",
    "koopman"    : "0x2468C69C",
    "normal"     : "0x8d18d39"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 222, "bytes"   : 27 },
    /* 4 */ { "bits"    : 222, "bytes"   : 27 },
    /* 5 */ { "bits"    : 35, "bytes"   : 4 },
    /* 6 */ { "bits"    : 35, "bytes"   : 4 },
    /* 7 */ { "bits"    : 35, "bytes"   : 4 },
    /* 8 */ { "bits"    : 35, "bytes"   : 4 },
    /* 9 */ { "bits"    : 35, "bytes"   : 4 },
    /* 10 */ { "bits"    : 35, "bytes"   : 4 },
    /* 11 */ { "bits"    : 35, "bytes"   : 4 },
    /* 12 */ { "bits"    : 35, "bytes"   : 4 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 },
    /* 14 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^27 + x^24 + x^21 + x^17 + x^15 + x^14 + x^12 + x^7 + x^5 + x^3 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x4922d0ab",
    "koopman"    : "0x24916855",
    "normal"     : "0x922d0ab"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 55553, "bytes"   : 6944 },
    /* 5 */ { "bits"    : 1243, "bytes"   : 155 },
    /* 6 */ { "bits"    : 361, "bytes"   : 45 },
    /* 7 */ { "bits"    : 114, "bytes"   : 14 },
    /* 8 */ { "bits"    : 74, "bytes"   : 9 },
    /* 9 */ { "bits"    : 49, "bytes"   : 6 },
    /* 10 */ { "bits"    : 27, "bytes"   : 3 },
    /* 11 */ { "bits"    : 19, "bytes"   : 2 },
    /* 12 */ { "bits"    : 19, "bytes"   : 2 },
    /* 13 */ { "bits"    : 12, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^27 + x^26 + x^24 + x^23 + x^21 + x^18 + x^17 + x^13 + x^12 + x^11 + x^9 + x^6 + x^5 + x^4 + x^3 + 1",
    "degree"     : 30,
    "explicit"   : "0x4da63a79",
    "koopman"    : "0x26D31D3C",
    "normal"     : "0xda63a79"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 38136, "bytes"   : 4767 },
    /* 5 */ { "bits"    : 1617, "bytes"   : 202 },
    /* 6 */ { "bits"    : 463, "bytes"   : 57 },
    /* 7 */ { "bits"    : 123, "bytes"   : 15 },
    /* 8 */ { "bits"    : 81, "bytes"   : 10 },
    /* 9 */ { "bits"    : 44, "bytes"   : 5 },
    /* 10 */ { "bits"    : 24, "bytes"   : 3 },
    /* 11 */ { "bits"    : 16, "bytes"   : 2 },
    /* 12 */ { "bits"    : 15, "bytes"   : 1 },
    /* 13 */ { "bits"    : 15, "bytes"   : 1 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 },
    /* 17 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^27 + x^26 + x^25 + x^22 + x^20 + x^16 + x^15 + x^14 + x^13 + x^12 + x^10 + x^9 + x^8 + x^6 + x^4 + x^3 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x4e51f75b",
    "koopman"    : "0x2728FBAD",
    "normal"     : "0xe51f75b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 18343, "bytes"   : 2292 },
    /* 5 */ { "bits"    : 1383, "bytes"   : 172 },
    /* 6 */ { "bits"    : 383, "bytes"   : 47 },
    /* 7 */ { "bits"    : 166, "bytes"   : 20 },
    /* 8 */ { "bits"    : 46, "bytes"   : 5 },
    /* 9 */ { "bits"    : 35, "bytes"   : 4 },
    /* 10 */ { "bits"    : 24, "bytes"   : 3 },
    /* 11 */ { "bits"    : 9, "bytes"   : 1 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 7, "bytes"   : 0 },
    /* 15 */ { "bits"    : 7, "bytes"   : 0 },
    /* 16 */ { "bits"    : 5, "bytes"   : 0 },
    /* 17 */ { "bits"    : 4, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^28 + x^24 + x^21 + x^19 + x^18 + x^17 + x^16 + x^15 + x^14 + x^13 + x^12 + x^7 + x^6 + x^3 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x512ff0cb",
    "koopman"    : "0x2897F865",
    "normal"     : "0x112ff0cb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 54065, "bytes"   : 6758 },
    /* 5 */ { "bits"    : 2555, "bytes"   : 319 },
    /* 6 */ { "bits"    : 395, "bytes"   : 49 },
    /* 7 */ { "bits"    : 143, "bytes"   : 17 },
    /* 8 */ { "bits"    : 58, "bytes"   : 7 },
    /* 9 */ { "bits"    : 24, "bytes"   : 3 },
    /* 10 */ { "bits"    : 24, "bytes"   : 3 },
    /* 11 */ { "bits"    : 19, "bytes"   : 2 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 9, "bytes"   : 1 },
    /* 15 */ { "bits"    : 8, "bytes"   : 1 },
    /* 16 */ { "bits"    : 8, "bytes"   : 1 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^28 + x^25 + x^20 + x^19 + x^17 + x^15 + x^14 + x^12 + x^11 + x^9 + x^4 + x^3 + x^2 + 1",
    "degree"     : 30,
    "explicit"   : "0x521ada1d",
    "koopman"    : "0x290D6D0E",
    "normal"     : "0x121ada1d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 357886605, "bytes"   : 44735825 },
    /* 4 */ { "bits"    : 35049, "bytes"   : 4381 },
    /* 5 */ { "bits"    : 2011, "bytes"   : 251 },
    /* 6 */ { "bits"    : 496, "bytes"   : 62 },
    /* 7 */ { "bits"    : 111, "bytes"   : 13 },
    /* 8 */ { "bits"    : 80, "bytes"   : 10 },
    /* 9 */ { "bits"    : 32, "bytes"   : 4 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 14, "bytes"   : 1 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 },
    /* 13 */ { "bits"    : 11, "bytes"   : 1 },
    /* 14 */ { "bits"    : 11, "bytes"   : 1 },
    /* 15 */ { "bits"    : 11, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^28 + x^26 + x^23 + x^21 + x^20 + x^18 + x^17 + x^16 + x^13 + x^9 + x^8 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x54b7233b",
    "koopman"    : "0x2A5B919D",
    "normal"     : "0x14b7233b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 81187, "bytes"   : 10148 },
    /* 5 */ { "bits"    : 1579, "bytes"   : 197 },
    /* 6 */ { "bits"    : 786, "bytes"   : 98 },
    /* 7 */ { "bits"    : 104, "bytes"   : 13 },
    /* 8 */ { "bits"    : 68, "bytes"   : 8 },
    /* 9 */ { "bits"    : 44, "bytes"   : 5 },
    /* 10 */ { "bits"    : 22, "bytes"   : 2 },
    /* 11 */ { "bits"    : 13, "bytes"   : 1 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 },
    /* 17 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^28 + x^26 + x^24 + x^21 + x^20 + x^18 + x^17 + x^14 + x^13 + x^12 + x^11 + x^10 + x^5 + x^3 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x55367c2b",
    "koopman"    : "0x2A9B3E15",
    "normal"     : "0x15367c2b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 993, "bytes"   : 124 },
    /* 4 */ { "bits"    : 993, "bytes"   : 124 },
    /* 5 */ { "bits"    : 993, "bytes"   : 124 },
    /* 6 */ { "bits"    : 993, "bytes"   : 124 },
    /* 7 */ { "bits"    : 993, "bytes"   : 124 },
    /* 8 */ { "bits"    : 96, "bytes"   : 12 },
    /* 9 */ { "bits"    : 50, "bytes"   : 6 },
    /* 10 */ { "bits"    : 27, "bytes"   : 3 },
    /* 11 */ { "bits"    : 16, "bytes"   : 2 },
    /* 12 */ { "bits"    : 13, "bytes"   : 1 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^28 + x^26 + x^24 + x^23 + x^21 + x^19 + x^16 + x^14 + x^11 + x^9 + x^7 + x^6 + x^4 + x^2 + 1",
    "degree"     : 30,
    "explicit"   : "0x55a94ad5",
    "koopman"    : "0x2AD4A56A",
    "normal"     : "0x15a94ad5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32740, "bytes"   : 4092 },
    /* 4 */ { "bits"    : 32740, "bytes"   : 4092 },
    /* 5 */ { "bits"    : 16356, "bytes"   : 2044 },
    /* 6 */ { "bits"    : 16356, "bytes"   : 2044 },
    /* 7 */ { "bits"    : 138, "bytes"   : 17 },
    /* 8 */ { "bits"    : 138, "bytes"   : 17 },
    /* 9 */ { "bits"    : 25, "bytes"   : 3 },
    /* 10 */ { "bits"    : 25, "bytes"   : 3 },
    /* 11 */ { "bits"    : 2, "bytes"   : 0 },
    /* 12 */ { "bits"    : 2, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^28 + x^26 + x^24 + x^23 + x^21 + x^20 + x^19 + x^18 + x^17 + x^14 + x^13 + x^12 + x^10 + x^8 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x55be755f",
    "koopman"    : "0x2ADF3AAF",
    "normal"     : "0x15be755f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32737, "bytes"   : 4092 },
    /* 4 */ { "bits"    : 32737, "bytes"   : 4092 },
    /* 5 */ { "bits"    : 32737, "bytes"   : 4092 },
    /* 6 */ { "bits"    : 514, "bytes"   : 64 },
    /* 7 */ { "bits"    : 237, "bytes"   : 29 },
    /* 8 */ { "bits"    : 74, "bytes"   : 9 },
    /* 9 */ { "bits"    : 23, "bytes"   : 2 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 16, "bytes"   : 2 },
    /* 12 */ { "bits"    : 5, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 2, "bytes"   : 0 },
    /* 20 */ { "bits"    : 2, "bytes"   : 0 },
    /* 21 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^28 + x^26 + x^25 + x^24 + x^21 + x^19 + x^18 + x^15 + x^14 + x^13 + x^12 + x^11 + x^10 + x^8 + x^7 + x^6 + x^5 + x^4 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x572cfdf3",
    "koopman"    : "0x2B967EF9",
    "normal"     : "0x172cfdf3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8371683, "bytes"   : 1046460 },
    /* 4 */ { "bits"    : 38564, "bytes"   : 4820 },
    /* 5 */ { "bits"    : 1777, "bytes"   : 222 },
    /* 6 */ { "bits"    : 396, "bytes"   : 49 },
    /* 7 */ { "bits"    : 63, "bytes"   : 7 },
    /* 8 */ { "bits"    : 63, "bytes"   : 7 },
    /* 9 */ { "bits"    : 34, "bytes"   : 4 },
    /* 10 */ { "bits"    : 22, "bytes"   : 2 },
    /* 11 */ { "bits"    : 19, "bytes"   : 2 },
    /* 12 */ { "bits"    : 16, "bytes"   : 2 },
    /* 13 */ { "bits"    : 16, "bytes"   : 2 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 },
    /* 20 */ { "bits"    : 1, "bytes"   : 0 },
    /* 21 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^28 + x^27 + x^26 + x^24 + x^23 + x^22 + x^21 + x^20 + x^18 + x^17 + x^15 + x^10 + x^8 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x5df68557",
    "koopman"    : "0x2EFB42AB",
    "normal"     : "0x1df68557"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 19534, "bytes"   : 2441 },
    /* 5 */ { "bits"    : 1765, "bytes"   : 220 },
    /* 6 */ { "bits"    : 342, "bytes"   : 42 },
    /* 7 */ { "bits"    : 267, "bytes"   : 33 },
    /* 8 */ { "bits"    : 56, "bytes"   : 7 },
    /* 9 */ { "bits"    : 47, "bytes"   : 5 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 16, "bytes"   : 2 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^29 + x^21 + x^20 + x^15 + x^13 + x^12 + x^11 + x^8 + x^7 + x^6 + x^2 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x6030b9c7",
    "koopman"    : "0x30185CE3",
    "normal"     : "0x2030b9c7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 536870881, "bytes"   : 67108860 },
    /* 4 */ { "bits"    : 536870881, "bytes"   : 67108860 },
    /* 5 */ { "bits"    : 1762, "bytes"   : 220 },
    /* 6 */ { "bits"    : 1762, "bytes"   : 220 },
    /* 7 */ { "bits"    : 148, "bytes"   : 18 },
    /* 8 */ { "bits"    : 148, "bytes"   : 18 },
    /* 9 */ { "bits"    : 31, "bytes"   : 3 },
    /* 10 */ { "bits"    : 31, "bytes"   : 3 },
    /* 11 */ { "bits"    : 15, "bytes"   : 1 },
    /* 12 */ { "bits"    : 15, "bytes"   : 1 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^29 + x^25 + x^21 + x^15 + x^14 + x^13 + x^10 + x^9 + x^6 + x^5 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x6220e663",
    "koopman"    : "0x31107331",
    "normal"     : "0x2220e663"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 55080, "bytes"   : 6885 },
    /* 5 */ { "bits"    : 4958, "bytes"   : 619 },
    /* 6 */ { "bits"    : 457, "bytes"   : 57 },
    /* 7 */ { "bits"    : 158, "bytes"   : 19 },
    /* 8 */ { "bits"    : 77, "bytes"   : 9 },
    /* 9 */ { "bits"    : 36, "bytes"   : 4 },
    /* 10 */ { "bits"    : 21, "bytes"   : 2 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^29 + x^25 + x^22 + x^21 + x^19 + x^14 + x^12 + x^10 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x6268545f",
    "koopman"    : "0x31342A2F",
    "normal"     : "0x2268545f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 212811, "bytes"   : 26601 },
    /* 5 */ { "bits"    : 1604, "bytes"   : 200 },
    /* 6 */ { "bits"    : 318, "bytes"   : 39 },
    /* 7 */ { "bits"    : 78, "bytes"   : 9 },
    /* 8 */ { "bits"    : 78, "bytes"   : 9 },
    /* 9 */ { "bits"    : 41, "bytes"   : 5 },
    /* 10 */ { "bits"    : 28, "bytes"   : 3 },
    /* 11 */ { "bits"    : 16, "bytes"   : 2 },
    /* 12 */ { "bits"    : 15, "bytes"   : 1 },
    /* 13 */ { "bits"    : 11, "bytes"   : 1 },
    /* 14 */ { "bits"    : 7, "bytes"   : 0 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^29 + x^27 + x^23 + x^21 + x^18 + x^16 + x^14 + x^12 + x^9 + x^8 + x^6 + x^2 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x68a55347",
    "koopman"    : "0x3452A9A3",
    "normal"     : "0x28a55347"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 71125, "bytes"   : 8890 },
    /* 5 */ { "bits"    : 2113, "bytes"   : 264 },
    /* 6 */ { "bits"    : 328, "bytes"   : 41 },
    /* 7 */ { "bits"    : 112, "bytes"   : 14 },
    /* 8 */ { "bits"    : 41, "bytes"   : 5 },
    /* 9 */ { "bits"    : 29, "bytes"   : 3 },
    /* 10 */ { "bits"    : 25, "bytes"   : 3 },
    /* 11 */ { "bits"    : 12, "bytes"   : 1 },
    /* 12 */ { "bits"    : 12, "bytes"   : 1 },
    /* 13 */ { "bits"    : 12, "bytes"   : 1 },
    /* 14 */ { "bits"    : 12, "bytes"   : 1 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^29 + x^27 + x^24 + x^23 + x^20 + x^16 + x^15 + x^14 + x^4 + x^3 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x6991c01b",
    "koopman"    : "0x34C8E00D",
    "normal"     : "0x2991c01b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 96, "bytes"   : 12 },
    /* 4 */ { "bits"    : 96, "bytes"   : 12 },
    /* 5 */ { "bits"    : 40, "bytes"   : 5 },
    /* 6 */ { "bits"    : 40, "bytes"   : 5 },
    /* 7 */ { "bits"    : 36, "bytes"   : 4 },
    /* 8 */ { "bits"    : 36, "bytes"   : 4 },
    /* 9 */ { "bits"    : 36, "bytes"   : 4 },
    /* 10 */ { "bits"    : 36, "bytes"   : 4 },
    /* 11 */ { "bits"    : 36, "bytes"   : 4 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^29 + x^27 + x^25 + x^24 + x^22 + x^21 + x^20 + x^16 + x^15 + x^13 + x^8 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x6b71a17f",
    "koopman"    : "0x35B8D0BF",
    "normal"     : "0x2b71a17f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 32573, "bytes"   : 4071 },
    /* 5 */ { "bits"    : 2019, "bytes"   : 252 },
    /* 6 */ { "bits"    : 450, "bytes"   : 56 },
    /* 7 */ { "bits"    : 96, "bytes"   : 12 },
    /* 8 */ { "bits"    : 76, "bytes"   : 9 },
    /* 9 */ { "bits"    : 71, "bytes"   : 8 },
    /* 10 */ { "bits"    : 24, "bytes"   : 3 },
    /* 11 */ { "bits"    : 18, "bytes"   : 2 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 },
    /* 14 */ { "bits"    : 4, "bytes"   : 0 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^29 + x^28 + x^27 + x^24 + x^21 + x^20 + x^18 + x^12 + x^10 + x^9 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x7934164f",
    "koopman"    : "0x3C9A0B27",
    "normal"     : "0x3934164f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 56, "bytes"   : 7 },
    /* 4 */ { "bits"    : 56, "bytes"   : 7 },
    /* 5 */ { "bits"    : 14, "bytes"   : 1 },
    /* 6 */ { "bits"    : 14, "bytes"   : 1 },
    /* 7 */ { "bits"    : 14, "bytes"   : 1 },
    /* 8 */ { "bits"    : 14, "bytes"   : 1 },
    /* 9 */ { "bits"    : 14, "bytes"   : 1 },
    /* 10 */ { "bits"    : 14, "bytes"   : 1 },
    /* 11 */ { "bits"    : 14, "bytes"   : 1 },
    /* 12 */ { "bits"    : 14, "bytes"   : 1 },
    /* 13 */ { "bits"    : 14, "bytes"   : 1 },
    /* 14 */ { "bits"    : 14, "bytes"   : 1 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^30 + x^29 + x^28 + x^27 + x^25 + x^23 + x^22 + x^13 + x^12 + x^9 + x^8 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 30,
    "explicit"   : "0x7ac0333f",
    "koopman"    : "0x3D60199F",
    "normal"     : "0x3ac0333f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741793, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 32233, "bytes"   : 4029 },
    /* 5 */ { "bits"    : 1633, "bytes"   : 204 },
    /* 6 */ { "bits"    : 385, "bytes"   : 48 },
    /* 7 */ { "bits"    : 158, "bytes"   : 19 },
    /* 8 */ { "bits"    : 125, "bytes"   : 15 },
    /* 9 */ { "bits"    : 29, "bytes"   : 3 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 3, "bytes"   : 0 },
    /* 12 */ { "bits"    : 3, "bytes"   : 0 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^3 + 1",
    "degree"     : 31,
    "explicit"   : "0x80000009",
    "koopman"    : "0x40000004",
    "normal"     : "0x9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^7 + x^4 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0x80000097",
    "koopman"    : "0x4000004B",
    "normal"     : "0x97"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741792, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 1073741792, "bytes"   : 134217724 },
    /* 5 */ { "bits"    : 2674, "bytes"   : 334 },
    /* 6 */ { "bits"    : 2674, "bytes"   : 334 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^8 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0x80000177",
    "koopman"    : "0x400000BB",
    "normal"     : "0x177"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073215458, "bytes"   : 134151932 },
    /* 4 */ { "bits"    : 1073215458, "bytes"   : 134151932 },
    /* 5 */ { "bits"    : 3122, "bytes"   : 390 },
    /* 6 */ { "bits"    : 3122, "bytes"   : 390 },
    /* 7 */ { "bits"    : 3, "bytes"   : 0 },
    /* 8 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^19 + x^18 + x^13 + x^12 + 1",
    "degree"     : 31,
    "explicit"   : "0x800c3001",
    "koopman"    : "0x40061800",
    "normal"     : "0xc3001"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32738, "bytes"   : 4092 },
    /* 4 */ { "bits"    : 32738, "bytes"   : 4092 },
    /* 5 */ { "bits"    : 32738, "bytes"   : 4092 },
    /* 6 */ { "bits"    : 32738, "bytes"   : 4092 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^23 + x^22 + x^20 + x^18 + x^12 + x^11 + x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0x80d419ff",
    "koopman"    : "0x406A0CFF",
    "normal"     : "0xd419ff"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 992, "bytes"   : 124 },
    /* 4 */ { "bits"    : 992, "bytes"   : 124 },
    /* 5 */ { "bits"    : 992, "bytes"   : 124 },
    /* 6 */ { "bits"    : 992, "bytes"   : 124 },
    /* 7 */ { "bits"    : 992, "bytes"   : 124 },
    /* 8 */ { "bits"    : 992, "bytes"   : 124 },
    /* 9 */ { "bits"    : 43, "bytes"   : 5 },
    /* 10 */ { "bits"    : 43, "bytes"   : 5 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^24 + x^23 + x^21 + x^19 + x^17 + x^16 + x^15 + x^14 + x^12 + x^9 + x^8 + x^3 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0x81abd30b",
    "koopman"    : "0x40D5E985",
    "normal"     : "0x1abd30b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 57299, "bytes"   : 7162 },
    /* 5 */ { "bits"    : 1437, "bytes"   : 179 },
    /* 6 */ { "bits"    : 158, "bytes"   : 19 },
    /* 7 */ { "bits"    : 132, "bytes"   : 16 },
    /* 8 */ { "bits"    : 42, "bytes"   : 5 },
    /* 9 */ { "bits"    : 42, "bytes"   : 5 },
    /* 10 */ { "bits"    : 31, "bytes"   : 3 },
    /* 11 */ { "bits"    : 15, "bytes"   : 1 },
    /* 12 */ { "bits"    : 15, "bytes"   : 1 },
    /* 13 */ { "bits"    : 13, "bytes"   : 1 },
    /* 14 */ { "bits"    : 13, "bytes"   : 1 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^25 + x^24 + x^23 + x^21 + x^20 + x^19 + x^18 + x^17 + x^14 + x^12 + x^10 + x^7 + x^3 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0x83be548f",
    "koopman"    : "0x41DF2A47",
    "normal"     : "0x3be548f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 24992, "bytes"   : 3124 },
    /* 5 */ { "bits"    : 2361, "bytes"   : 295 },
    /* 6 */ { "bits"    : 279, "bytes"   : 34 },
    /* 7 */ { "bits"    : 160, "bytes"   : 20 },
    /* 8 */ { "bits"    : 67, "bytes"   : 8 },
    /* 9 */ { "bits"    : 46, "bytes"   : 5 },
    /* 10 */ { "bits"    : 20, "bytes"   : 2 },
    /* 11 */ { "bits"    : 12, "bytes"   : 1 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 9, "bytes"   : 1 },
    /* 15 */ { "bits"    : 9, "bytes"   : 1 },
    /* 16 */ { "bits"    : 9, "bytes"   : 1 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^27 + x^25 + x^23 + x^22 + x^20 + x^18 + x^14 + x^13 + x^11 + x^9 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0x8ad46a03",
    "koopman"    : "0x456A3501",
    "normal"     : "0xad46a03"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 284, "bytes"   : 35 },
    /* 4 */ { "bits"    : 284, "bytes"   : 35 },
    /* 5 */ { "bits"    : 47, "bytes"   : 5 },
    /* 6 */ { "bits"    : 47, "bytes"   : 5 },
    /* 7 */ { "bits"    : 36, "bytes"   : 4 },
    /* 8 */ { "bits"    : 36, "bytes"   : 4 },
    /* 9 */ { "bits"    : 36, "bytes"   : 4 },
    /* 10 */ { "bits"    : 36, "bytes"   : 4 },
    /* 11 */ { "bits"    : 36, "bytes"   : 4 },
    /* 12 */ { "bits"    : 18, "bytes"   : 2 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^27 + x^26 + x^20 + x^19 + x^18 + x^16 + x^15 + x^14 + x^10 + x^9 + x^8 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0x8c1dc77f",
    "koopman"    : "0x460EE3BF",
    "normal"     : "0xc1dc77f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 58790, "bytes"   : 7348 },
    /* 5 */ { "bits"    : 1420, "bytes"   : 177 },
    /* 6 */ { "bits"    : 452, "bytes"   : 56 },
    /* 7 */ { "bits"    : 84, "bytes"   : 10 },
    /* 8 */ { "bits"    : 52, "bytes"   : 6 },
    /* 9 */ { "bits"    : 45, "bytes"   : 5 },
    /* 10 */ { "bits"    : 39, "bytes"   : 4 },
    /* 11 */ { "bits"    : 35, "bytes"   : 4 },
    /* 12 */ { "bits"    : 13, "bytes"   : 1 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^27 + x^26 + x^24 + x^23 + x^22 + x^19 + x^17 + x^15 + x^14 + x^12 + x^10 + x^7 + x^6 + x^5 + x^4 + x^3 + 1",
    "degree"     : 31,
    "explicit"   : "0x8dcad4f9",
    "koopman"    : "0x46E56A7C",
    "normal"     : "0xdcad4f9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 938599400, "bytes"   : 117324925 },
    /* 4 */ { "bits"    : 938599400, "bytes"   : 117324925 },
    /* 5 */ { "bits"    : 1453, "bytes"   : 181 },
    /* 6 */ { "bits"    : 1453, "bytes"   : 181 },
    /* 7 */ { "bits"    : 162, "bytes"   : 20 },
    /* 8 */ { "bits"    : 162, "bytes"   : 20 },
    /* 9 */ { "bits"    : 28, "bytes"   : 3 },
    /* 10 */ { "bits"    : 28, "bytes"   : 3 },
    /* 11 */ { "bits"    : 17, "bytes"   : 2 },
    /* 12 */ { "bits"    : 17, "bytes"   : 2 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 8, "bytes"   : 1 },
    /* 16 */ { "bits"    : 8, "bytes"   : 1 },
    /* 17 */ { "bits"    : 4, "bytes"   : 0 },
    /* 18 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^27 + x^26 + x^25 + x^23 + x^20 + x^19 + x^18 + x^10 + x^9 + x^8 + x^6 + x^4 + x^3 + 1",
    "degree"     : 31,
    "explicit"   : "0x8e9c0759",
    "koopman"    : "0x474E03AC",
    "normal"     : "0xe9c0759"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 24098, "bytes"   : 3012 },
    /* 5 */ { "bits"    : 6168, "bytes"   : 771 },
    /* 6 */ { "bits"    : 510, "bytes"   : 63 },
    /* 7 */ { "bits"    : 149, "bytes"   : 18 },
    /* 8 */ { "bits"    : 98, "bytes"   : 12 },
    /* 9 */ { "bits"    : 45, "bytes"   : 5 },
    /* 10 */ { "bits"    : 22, "bytes"   : 2 },
    /* 11 */ { "bits"    : 22, "bytes"   : 2 },
    /* 12 */ { "bits"    : 15, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^27 + x^26 + x^25 + x^24 + x^23 + x^21 + x^18 + x^16 + x^15 + x^13 + x^12 + x^9 + x^8 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0x8fa5b357",
    "koopman"    : "0x47D2D9AB",
    "normal"     : "0xfa5b357"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147385314, "bytes"   : 268423164 },
    /* 4 */ { "bits"    : 88286, "bytes"   : 11035 },
    /* 5 */ { "bits"    : 2108, "bytes"   : 263 },
    /* 6 */ { "bits"    : 669, "bytes"   : 83 },
    /* 7 */ { "bits"    : 191, "bytes"   : 23 },
    /* 8 */ { "bits"    : 49, "bytes"   : 6 },
    /* 9 */ { "bits"    : 49, "bytes"   : 6 },
    /* 10 */ { "bits"    : 29, "bytes"   : 3 },
    /* 11 */ { "bits"    : 15, "bytes"   : 1 },
    /* 12 */ { "bits"    : 14, "bytes"   : 1 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 6, "bytes"   : 0 },
    /* 17 */ { "bits"    : 5, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^27 + x^26 + x^25 + x^24 + x^23 + x^22 + x^19 + x^18 + x^14 + x^11 + x^9 + x^7 + x^6 + x^3 + 1",
    "degree"     : 31,
    "explicit"   : "0x8fcc4ac9",
    "koopman"    : "0x47E62564",
    "normal"     : "0xfcc4ac9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 357886604, "bytes"   : 44735825 },
    /* 4 */ { "bits"    : 357886604, "bytes"   : 44735825 },
    /* 5 */ { "bits"    : 2703, "bytes"   : 337 },
    /* 6 */ { "bits"    : 2703, "bytes"   : 337 },
    /* 7 */ { "bits"    : 174, "bytes"   : 21 },
    /* 8 */ { "bits"    : 174, "bytes"   : 21 },
    /* 9 */ { "bits"    : 39, "bytes"   : 4 },
    /* 10 */ { "bits"    : 39, "bytes"   : 4 },
    /* 11 */ { "bits"    : 17, "bytes"   : 2 },
    /* 12 */ { "bits"    : 17, "bytes"   : 2 },
    /* 13 */ { "bits"    : 16, "bytes"   : 2 },
    /* 14 */ { "bits"    : 16, "bytes"   : 2 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 },
    /* 16 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^28 + x^25 + x^24 + x^23 + x^22 + x^21 + x^18 + x^16 + x^15 + x^14 + x^13 + x^10 + x^8 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0x93e5e56b",
    "koopman"    : "0x49F2F2B5",
    "normal"     : "0x13e5e56b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 79707, "bytes"   : 9963 },
    /* 5 */ { "bits"    : 2486, "bytes"   : 310 },
    /* 6 */ { "bits"    : 574, "bytes"   : 71 },
    /* 7 */ { "bits"    : 147, "bytes"   : 18 },
    /* 8 */ { "bits"    : 147, "bytes"   : 18 },
    /* 9 */ { "bits"    : 36, "bytes"   : 4 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 21, "bytes"   : 2 },
    /* 12 */ { "bits"    : 13, "bytes"   : 1 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 },
    /* 17 */ { "bits"    : 3, "bytes"   : 0 },
    /* 18 */ { "bits"    : 3, "bytes"   : 0 },
    /* 19 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^28 + x^26 + x^22 + x^21 + x^16 + x^15 + x^12 + x^11 + x^10 + x^9 + x^8 + x^7 + x^5 + x^3 + x^2 + 1",
    "degree"     : 31,
    "explicit"   : "0x94619fad",
    "koopman"    : "0x4A30CFD6",
    "normal"     : "0x14619fad"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 39591, "bytes"   : 4948 },
    /* 5 */ { "bits"    : 1518, "bytes"   : 189 },
    /* 6 */ { "bits"    : 320, "bytes"   : 40 },
    /* 7 */ { "bits"    : 139, "bytes"   : 17 },
    /* 8 */ { "bits"    : 90, "bytes"   : 11 },
    /* 9 */ { "bits"    : 81, "bytes"   : 10 },
    /* 10 */ { "bits"    : 18, "bytes"   : 2 },
    /* 11 */ { "bits"    : 18, "bytes"   : 2 },
    /* 12 */ { "bits"    : 14, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 7, "bytes"   : 0 },
    /* 15 */ { "bits"    : 5, "bytes"   : 0 },
    /* 16 */ { "bits"    : 5, "bytes"   : 0 },
    /* 17 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^28 + x^26 + x^22 + x^21 + x^20 + x^19 + x^18 + x^16 + x^15 + x^13 + x^11 + x^10 + x^7 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0x947dacd7",
    "koopman"    : "0x4A3ED66B",
    "normal"     : "0x147dacd7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 101769, "bytes"   : 12721 },
    /* 5 */ { "bits"    : 2646, "bytes"   : 330 },
    /* 6 */ { "bits"    : 450, "bytes"   : 56 },
    /* 7 */ { "bits"    : 6, "bytes"   : 0 },
    /* 8 */ { "bits"    : 6, "bytes"   : 0 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 6, "bytes"   : 0 },
    /* 17 */ { "bits"    : 5, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^28 + x^26 + x^23 + x^21 + x^20 + x^17 + x^16 + x^15 + x^14 + x^10 + x^9 + x^8 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0x94b3c703",
    "koopman"    : "0x4A59E381",
    "normal"     : "0x14b3c703"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 69278, "bytes"   : 8659 },
    /* 5 */ { "bits"    : 1131, "bytes"   : 141 },
    /* 6 */ { "bits"    : 554, "bytes"   : 69 },
    /* 7 */ { "bits"    : 124, "bytes"   : 15 },
    /* 8 */ { "bits"    : 76, "bytes"   : 9 },
    /* 9 */ { "bits"    : 47, "bytes"   : 5 },
    /* 10 */ { "bits"    : 43, "bytes"   : 5 },
    /* 11 */ { "bits"    : 22, "bytes"   : 2 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 },
    /* 13 */ { "bits"    : 11, "bytes"   : 1 },
    /* 14 */ { "bits"    : 10, "bytes"   : 1 },
    /* 15 */ { "bits"    : 10, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^28 + x^26 + x^25 + x^24 + x^23 + x^22 + x^21 + x^19 + x^14 + x^13 + x^12 + x^10 + x^8 + x^7 + x^6 + x^4 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0x97e875d3",
    "koopman"    : "0x4BF43AE9",
    "normal"     : "0x17e875d3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 68274, "bytes"   : 8534 },
    /* 5 */ { "bits"    : 2788, "bytes"   : 348 },
    /* 6 */ { "bits"    : 1019, "bytes"   : 127 },
    /* 7 */ { "bits"    : 147, "bytes"   : 18 },
    /* 8 */ { "bits"    : 73, "bytes"   : 9 },
    /* 9 */ { "bits"    : 35, "bytes"   : 4 },
    /* 10 */ { "bits"    : 21, "bytes"   : 2 },
    /* 11 */ { "bits"    : 21, "bytes"   : 2 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^28 + x^27 + x^26 + x^25 + x^24 + x^23 + x^22 + x^20 + x^18 + x^15 + x^14 + x^12 + x^10 + x^6 + x^5 + x^4 + x^2 + 1",
    "degree"     : 31,
    "explicit"   : "0x9fd4d475",
    "koopman"    : "0x4FEA6A3A",
    "normal"     : "0x1fd4d475"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 23848, "bytes"   : 2981 },
    /* 5 */ { "bits"    : 2157, "bytes"   : 269 },
    /* 6 */ { "bits"    : 339, "bytes"   : 42 },
    /* 7 */ { "bits"    : 40, "bytes"   : 5 },
    /* 8 */ { "bits"    : 40, "bytes"   : 5 },
    /* 9 */ { "bits"    : 40, "bytes"   : 5 },
    /* 10 */ { "bits"    : 26, "bytes"   : 3 },
    /* 11 */ { "bits"    : 25, "bytes"   : 3 },
    /* 12 */ { "bits"    : 24, "bytes"   : 3 },
    /* 13 */ { "bits"    : 10, "bytes"   : 1 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^29 + x^26 + x^24 + x^22 + x^20 + x^18 + x^15 + x^10 + x^9 + x^6 + x^5 + x^2 + 1",
    "degree"     : 31,
    "explicit"   : "0xa5548665",
    "koopman"    : "0x52AA4332",
    "normal"     : "0x25548665"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1073741792, "bytes"   : 134217724 },
    /* 4 */ { "bits"    : 1073741792, "bytes"   : 134217724 },
    /* 5 */ { "bits"    : 4957, "bytes"   : 619 },
    /* 6 */ { "bits"    : 4957, "bytes"   : 619 },
    /* 7 */ { "bits"    : 157, "bytes"   : 19 },
    /* 8 */ { "bits"    : 157, "bytes"   : 19 },
    /* 9 */ { "bits"    : 35, "bytes"   : 4 },
    /* 10 */ { "bits"    : 35, "bytes"   : 4 },
    /* 11 */ { "bits"    : 9, "bytes"   : 1 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^29 + x^26 + x^24 + x^23 + x^21 + x^18 + x^15 + x^11 + x^10 + x^8 + x^7 + x^6 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0xa5a48dc3",
    "koopman"    : "0x52D246E1",
    "normal"     : "0x25a48dc3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 22020044, "bytes"   : 2752505 },
    /* 4 */ { "bits"    : 21758, "bytes"   : 2719 },
    /* 5 */ { "bits"    : 2792, "bytes"   : 349 },
    /* 6 */ { "bits"    : 474, "bytes"   : 59 },
    /* 7 */ { "bits"    : 132, "bytes"   : 16 },
    /* 8 */ { "bits"    : 82, "bytes"   : 10 },
    /* 9 */ { "bits"    : 61, "bytes"   : 7 },
    /* 10 */ { "bits"    : 23, "bytes"   : 2 },
    /* 11 */ { "bits"    : 23, "bytes"   : 2 },
    /* 12 */ { "bits"    : 14, "bytes"   : 1 },
    /* 13 */ { "bits"    : 14, "bytes"   : 1 },
    /* 14 */ { "bits"    : 12, "bytes"   : 1 },
    /* 15 */ { "bits"    : 12, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^29 + x^28 + x^25 + x^24 + x^22 + x^21 + x^19 + x^17 + x^13 + x^11 + x^10 + x^9 + x^6 + x^3 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0xb36a2e4b",
    "koopman"    : "0x59B51725",
    "normal"     : "0x336a2e4b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 38610, "bytes"   : 4826 },
    /* 5 */ { "bits"    : 1932, "bytes"   : 241 },
    /* 6 */ { "bits"    : 386, "bytes"   : 48 },
    /* 7 */ { "bits"    : 143, "bytes"   : 17 },
    /* 8 */ { "bits"    : 52, "bytes"   : 6 },
    /* 9 */ { "bits"    : 52, "bytes"   : 6 },
    /* 10 */ { "bits"    : 51, "bytes"   : 6 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 },
    /* 13 */ { "bits"    : 11, "bytes"   : 1 },
    /* 14 */ { "bits"    : 7, "bytes"   : 0 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 },
    /* 17 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^30 + x^24 + x^23 + x^22 + x^21 + x^18 + x^16 + x^13 + x^10 + x^4 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0xc1e52417",
    "koopman"    : "0x60F2920B",
    "normal"     : "0x41e52417"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 992, "bytes"   : 124 },
    /* 4 */ { "bits"    : 992, "bytes"   : 124 },
    /* 5 */ { "bits"    : 992, "bytes"   : 124 },
    /* 6 */ { "bits"    : 992, "bytes"   : 124 },
    /* 7 */ { "bits"    : 992, "bytes"   : 124 },
    /* 8 */ { "bits"    : 992, "bytes"   : 124 },
    /* 9 */ { "bits"    : 53, "bytes"   : 6 },
    /* 10 */ { "bits"    : 53, "bytes"   : 6 },
    /* 11 */ { "bits"    : 10, "bytes"   : 1 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 9, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^30 + x^27 + x^26 + x^22 + x^19 + x^16 + x^14 + x^13 + x^10 + x^8 + x^7 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0xcc4965d7",
    "koopman"    : "0x6624B2EB",
    "normal"     : "0x4c4965d7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 713031564, "bytes"   : 89128945 },
    /* 4 */ { "bits"    : 129449, "bytes"   : 16181 },
    /* 5 */ { "bits"    : 1806, "bytes"   : 225 },
    /* 6 */ { "bits"    : 587, "bytes"   : 73 },
    /* 7 */ { "bits"    : 109, "bytes"   : 13 },
    /* 8 */ { "bits"    : 73, "bytes"   : 9 },
    /* 9 */ { "bits"    : 48, "bytes"   : 6 },
    /* 10 */ { "bits"    : 27, "bytes"   : 3 },
    /* 11 */ { "bits"    : 19, "bytes"   : 2 },
    /* 12 */ { "bits"    : 18, "bytes"   : 2 },
    /* 13 */ { "bits"    : 18, "bytes"   : 2 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 },
    /* 17 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^30 + x^27 + x^26 + x^24 + x^23 + x^20 + x^19 + x^17 + x^14 + x^13 + x^11 + x^9 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0xcd9a6a6f",
    "koopman"    : "0x66CD3537",
    "normal"     : "0x4d9a6a6f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 89836, "bytes"   : 11229 },
    /* 5 */ { "bits"    : 2279, "bytes"   : 284 },
    /* 6 */ { "bits"    : 363, "bytes"   : 45 },
    /* 7 */ { "bits"    : 319, "bytes"   : 39 },
    /* 8 */ { "bits"    : 88, "bytes"   : 11 },
    /* 9 */ { "bits"    : 45, "bytes"   : 5 },
    /* 10 */ { "bits"    : 30, "bytes"   : 3 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^30 + x^28 + x^25 + x^19 + x^18 + x^16 + x^15 + x^11 + x^9 + x^7 + 1",
    "degree"     : 31,
    "explicit"   : "0xd20d8a81",
    "koopman"    : "0x6906C540",
    "normal"     : "0x520d8a81"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32736, "bytes"   : 4092 },
    /* 4 */ { "bits"    : 32736, "bytes"   : 4092 },
    /* 5 */ { "bits"    : 32736, "bytes"   : 4092 },
    /* 6 */ { "bits"    : 32736, "bytes"   : 4092 },
    /* 7 */ { "bits"    : 55, "bytes"   : 6 },
    /* 8 */ { "bits"    : 55, "bytes"   : 6 },
    /* 9 */ { "bits"    : 30, "bytes"   : 3 },
    /* 10 */ { "bits"    : 30, "bytes"   : 3 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^30 + x^28 + x^26 + x^25 + x^24 + x^23 + x^22 + x^20 + x^19 + x^18 + x^14 + x^12 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0xd7dc507f",
    "koopman"    : "0x6BEE283F",
    "normal"     : "0x57dc507f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 95, "bytes"   : 11 },
    /* 4 */ { "bits"    : 95, "bytes"   : 11 },
    /* 5 */ { "bits"    : 39, "bytes"   : 4 },
    /* 6 */ { "bits"    : 39, "bytes"   : 4 },
    /* 7 */ { "bits"    : 35, "bytes"   : 4 },
    /* 8 */ { "bits"    : 35, "bytes"   : 4 },
    /* 9 */ { "bits"    : 35, "bytes"   : 4 },
    /* 10 */ { "bits"    : 35, "bytes"   : 4 },
    /* 11 */ { "bits"    : 35, "bytes"   : 4 },
    /* 12 */ { "bits"    : 35, "bytes"   : 4 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 },
    /* 20 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^30 + x^28 + x^27 + x^23 + x^22 + x^21 + x^19 + x^12 + x^10 + x^9 + x^8 + x^4 + x^3 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0xd8e8171b",
    "koopman"    : "0x6C740B8D",
    "normal"     : "0x58e8171b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 485, "bytes"   : 60 },
    /* 4 */ { "bits"    : 485, "bytes"   : 60 },
    /* 5 */ { "bits"    : 100, "bytes"   : 12 },
    /* 6 */ { "bits"    : 100, "bytes"   : 12 },
    /* 7 */ { "bits"    : 100, "bytes"   : 12 },
    /* 8 */ { "bits"    : 100, "bytes"   : 12 },
    /* 9 */ { "bits"    : 100, "bytes"   : 12 },
    /* 10 */ { "bits"    : 100, "bytes"   : 12 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^30 + x^28 + x^27 + x^25 + x^20 + x^17 + x^15 + x^12 + x^11 + x^7 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0xda1298bb",
    "koopman"    : "0x6D094C5D",
    "normal"     : "0x5a1298bb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 3035, "bytes"   : 379 },
    /* 4 */ { "bits"    : 3035, "bytes"   : 379 },
    /* 5 */ { "bits"    : 137, "bytes"   : 17 },
    /* 6 */ { "bits"    : 137, "bytes"   : 17 },
    /* 7 */ { "bits"    : 50, "bytes"   : 6 },
    /* 8 */ { "bits"    : 50, "bytes"   : 6 },
    /* 9 */ { "bits"    : 22, "bytes"   : 2 },
    /* 10 */ { "bits"    : 22, "bytes"   : 2 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 },
    /* 13 */ { "bits"    : 11, "bytes"   : 1 },
    /* 14 */ { "bits"    : 11, "bytes"   : 1 },
    /* 15 */ { "bits"    : 11, "bytes"   : 1 },
    /* 16 */ { "bits"    : 11, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^30 + x^29 + x^23 + x^21 + x^20 + x^18 + x^14 + x^13 + x^12 + x^9 + x^8 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0xe0b47357",
    "koopman"    : "0x705A39AB",
    "normal"     : "0x60b47357"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 54608, "bytes"   : 6826 },
    /* 5 */ { "bits"    : 826, "bytes"   : 103 },
    /* 6 */ { "bits"    : 327, "bytes"   : 40 },
    /* 7 */ { "bits"    : 130, "bytes"   : 16 },
    /* 8 */ { "bits"    : 91, "bytes"   : 11 },
    /* 9 */ { "bits"    : 65, "bytes"   : 8 },
    /* 10 */ { "bits"    : 26, "bytes"   : 3 },
    /* 11 */ { "bits"    : 18, "bytes"   : 2 },
    /* 12 */ { "bits"    : 18, "bytes"   : 2 },
    /* 13 */ { "bits"    : 18, "bytes"   : 2 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^30 + x^29 + x^26 + x^25 + x^23 + x^22 + x^21 + x^20 + x^19 + x^18 + x^14 + x^13 + x^9 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0xe6fc6257",
    "koopman"    : "0x737E312B",
    "normal"     : "0x66fc6257"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483616, "bytes"   : 268435452 },
    /* 4 */ { "bits"    : 335041, "bytes"   : 41880 },
    /* 5 */ { "bits"    : 2609, "bytes"   : 326 },
    /* 6 */ { "bits"    : 214, "bytes"   : 26 },
    /* 7 */ { "bits"    : 140, "bytes"   : 17 },
    /* 8 */ { "bits"    : 55, "bytes"   : 6 },
    /* 9 */ { "bits"    : 45, "bytes"   : 5 },
    /* 10 */ { "bits"    : 30, "bytes"   : 3 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 },
    /* 14 */ { "bits"    : 5, "bytes"   : 0 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 },
    /* 16 */ { "bits"    : 4, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^31 + x^30 + x^29 + x^27 + x^24 + x^23 + x^22 + x^21 + x^20 + x^17 + x^16 + x^15 + x^14 + x^11 + x^10 + x^9 + x^8 + x^7 + x^4 + x^2 + x^1 + 1",
    "degree"     : 31,
    "explicit"   : "0xe9f3cf97",
    "koopman"    : "0x74F9E7CB",
    "normal"     : "0x69f3cf97"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 32738, "bytes"   : 4092 },
    /* 4 */ { "bits"    : 32738, "bytes"   : 4092 },
    /* 5 */ { "bits"    : 32738, "bytes"   : 4092 },
    /* 6 */ { "bits"    : 32738, "bytes"   : 4092 },
    /* 7 */ { "bits"    : 151, "bytes"   : 18 },
    /* 8 */ { "bits"    : 151, "bytes"   : 18 },
    /* 9 */ { "bits"    : 14, "bytes"   : 1 },
    /* 10 */ { "bits"    : 14, "bytes"   : 1 },
    /* 11 */ { "bits"    : 13, "bytes"   : 1 },
    /* 12 */ { "bits"    : 13, "bytes"   : 1 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 },
    /* 14 */ { "bits"    : 7, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 },
    /* 20 */ { "bits"    : 1, "bytes"   : 0 },
    /* 21 */ { "bits"    : 1, "bytes"   : 0 },
    /* 22 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + 1",
    "degree"     : 32,
    "explicit"   : "0x100000001",
    "koopman"    : "0x80000000",
    "normal"     : "0x1"
  },
  "hd" :     [null, null, null
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^7 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x1000000af",
    "koopman"    : "0x80000057",
    "normal"     : "0xaf"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 107274, "bytes"   : 13409 },
    /* 5 */ { "bits"    : 2770, "bytes"   : 346 },
    /* 6 */ { "bits"    : 325, "bytes"   : 40 },
    /* 7 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^7 + x^6 + x^5 + x^2 + 1",
    "degree"     : 32,
    "explicit"   : "0x1000000e5",
    "koopman"    : "0x80000072",
    "normal"     : "0xe5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1761607438, "bytes"   : 220200929 },
    /* 4 */ { "bits"    : 1761607438, "bytes"   : 220200929 },
    /* 5 */ { "bits"    : 4113, "bytes"   : 514 },
    /* 6 */ { "bits"    : 4113, "bytes"   : 514 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^8 + x^7 + x^6 + x^5 + x^3 + x^2 + 1",
    "degree"     : 32,
    "explicit"   : "0x1000001ed",
    "koopman"    : "0x800000F6",
    "normal"     : "0x1ed"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 715128459, "bytes"   : 89391057 },
    /* 4 */ { "bits"    : 715128459, "bytes"   : 89391057 },
    /* 5 */ { "bits"    : 2738, "bytes"   : 342 },
    /* 6 */ { "bits"    : 2738, "bytes"   : 342 },
    /* 7 */ { "bits"    : 100, "bytes"   : 12 },
    /* 8 */ { "bits"    : 100, "bytes"   : 12 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^14 + x^12 + x^10 + x^9 + x^8 + x^4 + x^3 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x10000571b",
    "koopman"    : "0x80002B8D",
    "normal"     : "0x571b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483615, "bytes"   : 268435451 },
    /* 4 */ { "bits"    : 2147483615, "bytes"   : 268435451 },
    /* 5 */ { "bits"    : 3525, "bytes"   : 440 },
    /* 6 */ { "bits"    : 3525, "bytes"   : 440 },
    /* 7 */ { "bits"    : 176, "bytes"   : 22 },
    /* 8 */ { "bits"    : 176, "bytes"   : 22 },
    /* 9 */ { "bits"    : 59, "bytes"   : 7 },
    /* 10 */ { "bits"    : 59, "bytes"   : 7 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^21 + x^16 + x^11 + 1",
    "degree"     : 32,
    "explicit"   : "0x100210801",
    "koopman"    : "0x80108400",
    "normal"     : "0x210801"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65505, "bytes"   : 8188 },
    /* 4 */ { "bits"    : 65505, "bytes"   : 8188 },
    /* 5 */ { "bits"    : 65505, "bytes"   : 8188 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^24 + x^23 + x^22 + x^21 + x^20 + x^19 + x^16 + x^14 + x^13 + x^7 + x^6 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x101f960ef",
    "koopman"    : "0x80FCB077",
    "normal"     : "0x1f960ef"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 47729, "bytes"   : 5966 },
    /* 5 */ { "bits"    : 3343, "bytes"   : 417 },
    /* 6 */ { "bits"    : 519, "bytes"   : 64 },
    /* 7 */ { "bits"    : 356, "bytes"   : 44 },
    /* 8 */ { "bits"    : 68, "bytes"   : 8 },
    /* 9 */ { "bits"    : 41, "bytes"   : 5 },
    /* 10 */ { "bits"    : 31, "bytes"   : 3 },
    /* 11 */ { "bits"    : 17, "bytes"   : 2 },
    /* 12 */ { "bits"    : 9, "bytes"   : 1 },
    /* 13 */ { "bits"    : 1, "bytes"   : 0 },
    /* 14 */ { "bits"    : 1, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^25 + x^24 + x^23 + x^21 + x^19 + x^18 + x^17 + x^16 + x^15 + x^14 + x^11 + x^10 + x^9 + x^7 + x^3 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x103afce8f",
    "koopman"    : "0x81D7E747",
    "normal"     : "0x3afce8f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 27933, "bytes"   : 3491 },
    /* 5 */ { "bits"    : 2311, "bytes"   : 288 },
    /* 6 */ { "bits"    : 664, "bytes"   : 83 },
    /* 7 */ { "bits"    : 199, "bytes"   : 24 },
    /* 8 */ { "bits"    : 70, "bytes"   : 8 },
    /* 9 */ { "bits"    : 58, "bytes"   : 7 },
    /* 10 */ { "bits"    : 33, "bytes"   : 4 },
    /* 11 */ { "bits"    : 18, "bytes"   : 2 },
    /* 12 */ { "bits"    : 18, "bytes"   : 2 },
    /* 13 */ { "bits"    : 16, "bytes"   : 2 },
    /* 14 */ { "bits"    : 15, "bytes"   : 1 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^26 + x^23 + x^16 + x^12 + x^11 + x^10 + x^8 + x^7 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x104811db7",
    "koopman"    : "0x82408EDB",
    "normal"     : "0x4811db7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65011649, "bytes"   : 8126456 },
    /* 4 */ { "bits"    : 65011649, "bytes"   : 8126456 },
    /* 5 */ { "bits"    : 1746, "bytes"   : 218 },
    /* 6 */ { "bits"    : 1746, "bytes"   : 218 },
    /* 7 */ { "bits"    : 120, "bytes"   : 15 },
    /* 8 */ { "bits"    : 120, "bytes"   : 15 },
    /* 9 */ { "bits"    : 45, "bytes"   : 5 },
    /* 10 */ { "bits"    : 45, "bytes"   : 5 },
    /* 11 */ { "bits"    : 21, "bytes"   : 2 },
    /* 12 */ { "bits"    : 21, "bytes"   : 2 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 9, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^26 + x^23 + x^22 + x^16 + x^12 + x^11 + x^10 + x^8 + x^7 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x104c11db7",
    "koopman"    : "0x82608EDB",
    "normal"     : "0x4c11db7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 91607, "bytes"   : 11450 },
    /* 5 */ { "bits"    : 2974, "bytes"   : 371 },
    /* 6 */ { "bits"    : 268, "bytes"   : 33 },
    /* 7 */ { "bits"    : 171, "bytes"   : 21 },
    /* 8 */ { "bits"    : 91, "bytes"   : 11 },
    /* 9 */ { "bits"    : 57, "bytes"   : 7 },
    /* 10 */ { "bits"    : 34, "bytes"   : 4 },
    /* 11 */ { "bits"    : 21, "bytes"   : 2 },
    /* 12 */ { "bits"    : 12, "bytes"   : 1 },
    /* 13 */ { "bits"    : 10, "bytes"   : 1 },
    /* 14 */ { "bits"    : 10, "bytes"   : 1 },
    /* 15 */ { "bits"    : 10, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^27 + x^25 + x^24 + x^22 + x^21 + x^20 + x^17 + x^15 + x^13 + x^11 + x^10 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x10b72ac3b",
    "koopman"    : "0x85B9561D",
    "normal"     : "0xb72ac3b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 3758096345, "bytes"   : 469762043 },
    /* 4 */ { "bits"    : 182765, "bytes"   : 22845 },
    /* 5 */ { "bits"    : 4916, "bytes"   : 614 },
    /* 6 */ { "bits"    : 575, "bytes"   : 71 },
    /* 7 */ { "bits"    : 106, "bytes"   : 13 },
    /* 8 */ { "bits"    : 86, "bytes"   : 10 },
    /* 9 */ { "bits"    : 47, "bytes"   : 5 },
    /* 10 */ { "bits"    : 41, "bytes"   : 5 },
    /* 11 */ { "bits"    : 38, "bytes"   : 4 },
    /* 12 */ { "bits"    : 18, "bytes"   : 2 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 9, "bytes"   : 1 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^27 + x^26 + x^25 + x^23 + x^17 + x^16 + x^15 + x^11 + x^10 + x^9 + x^6 + x^3 + x^2 + 1",
    "degree"     : 32,
    "explicit"   : "0x10e838e4d",
    "koopman"    : "0x8741C726",
    "normal"     : "0xe838e4d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 93289, "bytes"   : 11661 },
    /* 5 */ { "bits"    : 2083, "bytes"   : 260 },
    /* 6 */ { "bits"    : 725, "bytes"   : 90 },
    /* 7 */ { "bits"    : 249, "bytes"   : 31 },
    /* 8 */ { "bits"    : 163, "bytes"   : 20 },
    /* 9 */ { "bits"    : 58, "bytes"   : 7 },
    /* 10 */ { "bits"    : 30, "bytes"   : 3 },
    /* 11 */ { "bits"    : 13, "bytes"   : 1 },
    /* 12 */ { "bits"    : 13, "bytes"   : 1 },
    /* 13 */ { "bits"    : 7, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^27 + x^26 + x^25 + x^23 + x^20 + x^17 + x^15 + x^14 + x^9 + x^7 + x^6 + x^3 + x^2 + 1",
    "degree"     : 32,
    "explicit"   : "0x10e92c2cd",
    "koopman"    : "0x87496166",
    "normal"     : "0xe92c2cd"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 126795, "bytes"   : 15849 },
    /* 5 */ { "bits"    : 2098, "bytes"   : 262 },
    /* 6 */ { "bits"    : 272, "bytes"   : 34 },
    /* 7 */ { "bits"    : 103, "bytes"   : 12 },
    /* 8 */ { "bits"    : 103, "bytes"   : 12 },
    /* 9 */ { "bits"    : 52, "bytes"   : 6 },
    /* 10 */ { "bits"    : 35, "bytes"   : 4 },
    /* 11 */ { "bits"    : 21, "bytes"   : 2 },
    /* 12 */ { "bits"    : 15, "bytes"   : 1 },
    /* 13 */ { "bits"    : 15, "bytes"   : 1 },
    /* 14 */ { "bits"    : 14, "bytes"   : 1 },
    /* 15 */ { "bits"    : 14, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^28 + x^27 + x^23 + x^22 + x^21 + x^19 + x^15 + x^14 + x^12 + x^11 + x^10 + x^8 + x^7 + x^5 + x^3 + 1",
    "degree"     : 32,
    "explicit"   : "0x118e8dda9",
    "koopman"    : "0x8C746ED4",
    "normal"     : "0x18e8dda9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 116655, "bytes"   : 14581 },
    /* 5 */ { "bits"    : 1682, "bytes"   : 210 },
    /* 6 */ { "bits"    : 490, "bytes"   : 61 },
    /* 7 */ { "bits"    : 102, "bytes"   : 12 },
    /* 8 */ { "bits"    : 76, "bytes"   : 9 },
    /* 9 */ { "bits"    : 67, "bytes"   : 8 },
    /* 10 */ { "bits"    : 42, "bytes"   : 5 },
    /* 11 */ { "bits"    : 22, "bytes"   : 2 },
    /* 12 */ { "bits"    : 15, "bytes"   : 1 },
    /* 13 */ { "bits"    : 10, "bytes"   : 1 },
    /* 14 */ { "bits"    : 10, "bytes"   : 1 },
    /* 15 */ { "bits"    : 10, "bytes"   : 1 },
    /* 16 */ { "bits"    : 10, "bytes"   : 1 },
    /* 17 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^28 + x^27 + x^26 + x^22 + x^18 + x^17 + x^15 + x^14 + x^13 + x^9 + x^8 + x^7 + x^6 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x11c46e3df",
    "koopman"    : "0x8E2371EF",
    "normal"     : "0x1c46e3df"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 118103, "bytes"   : 14762 },
    /* 5 */ { "bits"    : 2438, "bytes"   : 304 },
    /* 6 */ { "bits"    : 1199, "bytes"   : 149 },
    /* 7 */ { "bits"    : 201, "bytes"   : 25 },
    /* 8 */ { "bits"    : 66, "bytes"   : 8 },
    /* 9 */ { "bits"    : 45, "bytes"   : 5 },
    /* 10 */ { "bits"    : 38, "bytes"   : 4 },
    /* 11 */ { "bits"    : 24, "bytes"   : 3 },
    /* 12 */ { "bits"    : 14, "bytes"   : 1 },
    /* 13 */ { "bits"    : 10, "bytes"   : 1 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^28 + x^27 + x^26 + x^24 + x^23 + x^22 + x^19 + x^17 + x^14 + x^13 + x^11 + x^10 + x^8 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x11dca6d1f",
    "koopman"    : "0x8EE5368F",
    "normal"     : "0x1dca6d1f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 82664, "bytes"   : 10333 },
    /* 5 */ { "bits"    : 2704, "bytes"   : 338 },
    /* 6 */ { "bits"    : 489, "bytes"   : 61 },
    /* 7 */ { "bits"    : 145, "bytes"   : 18 },
    /* 8 */ { "bits"    : 86, "bytes"   : 10 },
    /* 9 */ { "bits"    : 30, "bytes"   : 3 },
    /* 10 */ { "bits"    : 27, "bytes"   : 3 },
    /* 11 */ { "bits"    : 27, "bytes"   : 3 },
    /* 12 */ { "bits"    : 27, "bytes"   : 3 },
    /* 13 */ { "bits"    : 10, "bytes"   : 1 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 4, "bytes"   : 0 },
    /* 17 */ { "bits"    : 4, "bytes"   : 0 },
    /* 18 */ { "bits"    : 3, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^28 + x^27 + x^26 + x^24 + x^23 + x^22 + x^21 + x^20 + x^19 + x^17 + x^15 + x^12 + x^10 + x^9 + x^8 + x^7 + x^4 + x^3 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x11dfa979b",
    "koopman"    : "0x8EFD4BCD",
    "normal"     : "0x1dfa979b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 115159, "bytes"   : 14394 },
    /* 5 */ { "bits"    : 1173, "bytes"   : 146 },
    /* 6 */ { "bits"    : 469, "bytes"   : 58 },
    /* 7 */ { "bits"    : 157, "bytes"   : 19 },
    /* 8 */ { "bits"    : 96, "bytes"   : 12 },
    /* 9 */ { "bits"    : 6, "bytes"   : 0 },
    /* 10 */ { "bits"    : 6, "bytes"   : 0 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 6, "bytes"   : 0 },
    /* 17 */ { "bits"    : 6, "bytes"   : 0 },
    /* 18 */ { "bits"    : 4, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 },
    /* 20 */ { "bits"    : 1, "bytes"   : 0 },
    /* 21 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^28 + x^27 + x^26 + x^25 + x^23 + x^22 + x^20 + x^19 + x^18 + x^14 + x^13 + x^11 + x^10 + x^9 + x^8 + x^6 + 1",
    "degree"     : 32,
    "explicit"   : "0x11edc6f41",
    "koopman"    : "0x8F6E37A0",
    "normal"     : "0x1edc6f41"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483615, "bytes"   : 268435451 },
    /* 4 */ { "bits"    : 2147483615, "bytes"   : 268435451 },
    /* 5 */ { "bits"    : 5243, "bytes"   : 655 },
    /* 6 */ { "bits"    : 5243, "bytes"   : 655 },
    /* 7 */ { "bits"    : 177, "bytes"   : 22 },
    /* 8 */ { "bits"    : 177, "bytes"   : 22 },
    /* 9 */ { "bits"    : 47, "bytes"   : 5 },
    /* 10 */ { "bits"    : 47, "bytes"   : 5 },
    /* 11 */ { "bits"    : 20, "bytes"   : 2 },
    /* 12 */ { "bits"    : 20, "bytes"   : 2 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 6, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^29 + x^18 + x^14 + x^3 + 1",
    "degree"     : 32,
    "explicit"   : "0x120044009",
    "koopman"    : "0x90022004",
    "normal"     : "0x20044009"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65506, "bytes"   : 8188 },
    /* 4 */ { "bits"    : 65506, "bytes"   : 8188 },
    /* 5 */ { "bits"    : 32738, "bytes"   : 4092 },
    /* 6 */ { "bits"    : 32738, "bytes"   : 4092 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^29 + x^26 + x^25 + x^24 + x^22 + x^21 + x^18 + x^17 + x^16 + x^13 + x^12 + x^10 + x^9 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x127673637",
    "koopman"    : "0x93B39B1B",
    "normal"     : "0x27673637"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 41385, "bytes"   : 5173 },
    /* 5 */ { "bits"    : 1745, "bytes"   : 218 },
    /* 6 */ { "bits"    : 515, "bytes"   : 64 },
    /* 7 */ { "bits"    : 210, "bytes"   : 26 },
    /* 8 */ { "bits"    : 71, "bytes"   : 8 },
    /* 9 */ { "bits"    : 67, "bytes"   : 8 },
    /* 10 */ { "bits"    : 32, "bytes"   : 4 },
    /* 11 */ { "bits"    : 29, "bytes"   : 3 },
    /* 12 */ { "bits"    : 20, "bytes"   : 2 },
    /* 13 */ { "bits"    : 20, "bytes"   : 2 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 },
    /* 16 */ { "bits"    : 4, "bytes"   : 0 },
    /* 17 */ { "bits"    : 4, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^29 + x^27 + x^23 + x^21 + x^20 + x^19 + x^17 + x^11 + x^7 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x128ba08bb",
    "koopman"    : "0x945D045D",
    "normal"     : "0x28ba08bb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 184268, "bytes"   : 23033 },
    /* 5 */ { "bits"    : 3603, "bytes"   : 450 },
    /* 6 */ { "bits"    : 526, "bytes"   : 65 },
    /* 7 */ { "bits"    : 136, "bytes"   : 17 },
    /* 8 */ { "bits"    : 100, "bytes"   : 12 },
    /* 9 */ { "bits"    : 48, "bytes"   : 6 },
    /* 10 */ { "bits"    : 38, "bytes"   : 4 },
    /* 11 */ { "bits"    : 38, "bytes"   : 4 },
    /* 12 */ { "bits"    : 10, "bytes"   : 1 },
    /* 13 */ { "bits"    : 10, "bytes"   : 1 },
    /* 14 */ { "bits"    : 10, "bytes"   : 1 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^29 + x^27 + x^25 + x^20 + x^19 + x^18 + x^16 + x^14 + x^13 + x^12 + x^11 + x^10 + x^9 + x^8 + x^6 + x^4 + x^3 + x^2 + 1",
    "degree"     : 32,
    "explicit"   : "0x12a1d7f5d",
    "koopman"    : "0x950EBFAE",
    "normal"     : "0x2a1d7f5d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 306184014, "bytes"   : 38273001 },
    /* 4 */ { "bits"    : 306184014, "bytes"   : 38273001 },
    /* 5 */ { "bits"    : 2340, "bytes"   : 292 },
    /* 6 */ { "bits"    : 2340, "bytes"   : 292 },
    /* 7 */ { "bits"    : 162, "bytes"   : 20 },
    /* 8 */ { "bits"    : 162, "bytes"   : 20 },
    /* 9 */ { "bits"    : 41, "bytes"   : 5 },
    /* 10 */ { "bits"    : 41, "bytes"   : 5 },
    /* 11 */ { "bits"    : 36, "bytes"   : 4 },
    /* 12 */ { "bits"    : 36, "bytes"   : 4 },
    /* 13 */ { "bits"    : 2, "bytes"   : 0 },
    /* 14 */ { "bits"    : 2, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 2, "bytes"   : 0 },
    /* 20 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^29 + x^27 + x^26 + x^25 + x^22 + x^21 + x^20 + x^18 + x^16 + x^15 + x^14 + x^13 + x^12 + x^10 + x^9 + x^7 + x^5 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x12e75f6a3",
    "koopman"    : "0x973AFB51",
    "normal"     : "0x2e75f6a3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483612, "bytes"   : 268435451 },
    /* 4 */ { "bits"    : 2147483612, "bytes"   : 268435451 },
    /* 5 */ { "bits"    : 4159, "bytes"   : 519 },
    /* 6 */ { "bits"    : 4159, "bytes"   : 519 },
    /* 7 */ { "bits"    : 173, "bytes"   : 21 },
    /* 8 */ { "bits"    : 173, "bytes"   : 21 },
    /* 9 */ { "bits"    : 50, "bytes"   : 6 },
    /* 10 */ { "bits"    : 50, "bytes"   : 6 },
    /* 11 */ { "bits"    : 8, "bytes"   : 1 },
    /* 12 */ { "bits"    : 8, "bytes"   : 1 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 8, "bytes"   : 1 },
    /* 16 */ { "bits"    : 8, "bytes"   : 1 },
    /* 17 */ { "bits"    : 5, "bytes"   : 0 },
    /* 18 */ { "bits"    : 5, "bytes"   : 0 },
    /* 19 */ { "bits"    : 2, "bytes"   : 0 },
    /* 20 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^29 + x^28 + x^25 + x^22 + x^20 + x^19 + x^13 + x^12 + x^10 + x^7 + x^4 + x^3 + 1",
    "degree"     : 32,
    "explicit"   : "0x132583499",
    "koopman"    : "0x992C1A4C",
    "normal"     : "0x32583499"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65506, "bytes"   : 8188 },
    /* 4 */ { "bits"    : 65506, "bytes"   : 8188 },
    /* 5 */ { "bits"    : 32738, "bytes"   : 4092 },
    /* 6 */ { "bits"    : 32738, "bytes"   : 4092 },
    /* 7 */ { "bits"    : 134, "bytes"   : 16 },
    /* 8 */ { "bits"    : 134, "bytes"   : 16 },
    /* 9 */ { "bits"    : 26, "bytes"   : 3 },
    /* 10 */ { "bits"    : 26, "bytes"   : 3 },
    /* 11 */ { "bits"    : 16, "bytes"   : 2 },
    /* 12 */ { "bits"    : 16, "bytes"   : 2 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^29 + x^28 + x^25 + x^23 + x^22 + x^10 + x^9 + x^7 + x^4 + x^3 + 1",
    "degree"     : 32,
    "explicit"   : "0x132c00699",
    "koopman"    : "0x9960034C",
    "normal"     : "0x32c00699"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65506, "bytes"   : 8188 },
    /* 4 */ { "bits"    : 65506, "bytes"   : 8188 },
    /* 5 */ { "bits"    : 32738, "bytes"   : 4092 },
    /* 6 */ { "bits"    : 32738, "bytes"   : 4092 },
    /* 7 */ { "bits"    : 193, "bytes"   : 24 },
    /* 8 */ { "bits"    : 193, "bytes"   : 24 },
    /* 9 */ { "bits"    : 31, "bytes"   : 3 },
    /* 10 */ { "bits"    : 31, "bytes"   : 3 },
    /* 11 */ { "bits"    : 17, "bytes"   : 2 },
    /* 12 */ { "bits"    : 17, "bytes"   : 2 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^29 + x^28 + x^27 + x^25 + x^23 + x^22 + x^21 + x^20 + x^19 + x^18 + x^17 + x^16 + x^13 + x^11 + x^10 + x^9 + x^8 + x^7 + x^5 + x^3 + x^2 + 1",
    "degree"     : 32,
    "explicit"   : "0x13aff2fad",
    "koopman"    : "0x9D7F97D6",
    "normal"     : "0x3aff2fad"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 223, "bytes"   : 27 },
    /* 4 */ { "bits"    : 223, "bytes"   : 27 },
    /* 5 */ { "bits"    : 223, "bytes"   : 27 },
    /* 6 */ { "bits"    : 223, "bytes"   : 27 },
    /* 7 */ { "bits"    : 223, "bytes"   : 27 },
    /* 8 */ { "bits"    : 223, "bytes"   : 27 },
    /* 9 */ { "bits"    : 223, "bytes"   : 27 },
    /* 10 */ { "bits"    : 46, "bytes"   : 5 },
    /* 11 */ { "bits"    : 12, "bytes"   : 1 },
    /* 12 */ { "bits"    : 12, "bytes"   : 1 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 },
    /* 20 */ { "bits"    : 1, "bytes"   : 0 },
    /* 21 */ { "bits"    : 1, "bytes"   : 0 },
    /* 22 */ { "bits"    : 1, "bytes"   : 0 },
    /* 23 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^29 + x^28 + x^27 + x^25 + x^24 + x^21 + x^20 + x^17 + x^15 + x^11 + x^10 + x^9 + x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x13b328ffb",
    "koopman"    : "0x9D9947FD",
    "normal"     : "0x3b328ffb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 146826, "bytes"   : 18353 },
    /* 5 */ { "bits"    : 8162, "bytes"   : 1020 },
    /* 6 */ { "bits"    : 361, "bytes"   : 45 },
    /* 7 */ { "bits"    : 145, "bytes"   : 18 },
    /* 8 */ { "bits"    : 60, "bytes"   : 7 },
    /* 9 */ { "bits"    : 56, "bytes"   : 7 },
    /* 10 */ { "bits"    : 33, "bytes"   : 4 },
    /* 11 */ { "bits"    : 16, "bytes"   : 2 },
    /* 12 */ { "bits"    : 16, "bytes"   : 2 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 },
    /* 16 */ { "bits"    : 4, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 },
    /* 18 */ { "bits"    : 1, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 },
    /* 20 */ { "bits"    : 1, "bytes"   : 0 },
    /* 21 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^30 + x^24 + x^21 + x^19 + x^16 + x^14 + x^12 + x^11 + x^10 + x^9 + x^8 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x141295f6b",
    "koopman"    : "0xA094AFB5",
    "normal"     : "0x41295f6b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 19, "bytes"   : 2 },
    /* 4 */ { "bits"    : 19, "bytes"   : 2 },
    /* 5 */ { "bits"    : 19, "bytes"   : 2 },
    /* 6 */ { "bits"    : 19, "bytes"   : 2 },
    /* 7 */ { "bits"    : 19, "bytes"   : 2 },
    /* 8 */ { "bits"    : 19, "bytes"   : 2 },
    /* 9 */ { "bits"    : 19, "bytes"   : 2 },
    /* 10 */ { "bits"    : 19, "bytes"   : 2 },
    /* 11 */ { "bits"    : 19, "bytes"   : 2 },
    /* 12 */ { "bits"    : 19, "bytes"   : 2 },
    /* 13 */ { "bits"    : 19, "bytes"   : 2 },
    /* 14 */ { "bits"    : 19, "bytes"   : 2 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^30 + x^26 + x^23 + x^21 + x^19 + x^18 + x^17 + x^14 + x^12 + x^9 + x^7 + x^6 + x^2 + 1",
    "degree"     : 32,
    "explicit"   : "0x144ae52c5",
    "koopman"    : "0xA2572962",
    "normal"     : "0x44ae52c5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 73678013, "bytes"   : 9209751 },
    /* 4 */ { "bits"    : 73678013, "bytes"   : 9209751 },
    /* 5 */ { "bits"    : 3008, "bytes"   : 376 },
    /* 6 */ { "bits"    : 646, "bytes"   : 80 },
    /* 7 */ { "bits"    : 132, "bytes"   : 16 },
    /* 8 */ { "bits"    : 60, "bytes"   : 7 },
    /* 9 */ { "bits"    : 16, "bytes"   : 2 },
    /* 10 */ { "bits"    : 16, "bytes"   : 2 },
    /* 11 */ { "bits"    : 16, "bytes"   : 2 },
    /* 12 */ { "bits"    : 15, "bytes"   : 1 },
    /* 13 */ { "bits"    : 15, "bytes"   : 1 },
    /* 14 */ { "bits"    : 15, "bytes"   : 1 },
    /* 15 */ { "bits"    : 15, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^30 + x^28 + x^23 + x^22 + x^20 + x^18 + x^17 + x^16 + x^15 + x^14 + x^11 + x^8 + x^7 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x150d7c9b7",
    "koopman"    : "0xA86BE4DB",
    "normal"     : "0x50d7c9b7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 3758096345, "bytes"   : 469762043 },
    /* 4 */ { "bits"    : 85881, "bytes"   : 10735 },
    /* 5 */ { "bits"    : 2460, "bytes"   : 307 },
    /* 6 */ { "bits"    : 754, "bytes"   : 94 },
    /* 7 */ { "bits"    : 171, "bytes"   : 21 },
    /* 8 */ { "bits"    : 97, "bytes"   : 12 },
    /* 9 */ { "bits"    : 50, "bytes"   : 6 },
    /* 10 */ { "bits"    : 26, "bytes"   : 3 },
    /* 11 */ { "bits"    : 17, "bytes"   : 2 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 7, "bytes"   : 0 },
    /* 16 */ { "bits"    : 7, "bytes"   : 0 },
    /* 17 */ { "bits"    : 7, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^30 + x^28 + x^26 + x^25 + x^24 + x^21 + x^19 + x^18 + x^16 + x^14 + x^13 + x^12 + x^9 + x^7 + x^2 + 1",
    "degree"     : 32,
    "explicit"   : "0x1572d7285",
    "koopman"    : "0xAB96B942",
    "normal"     : "0x572d7285"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65503, "bytes"   : 8187 },
    /* 4 */ { "bits"    : 65503, "bytes"   : 8187 },
    /* 5 */ { "bits"    : 65503, "bytes"   : 8187 },
    /* 6 */ { "bits"    : 997, "bytes"   : 124 },
    /* 7 */ { "bits"    : 234, "bytes"   : 29 },
    /* 8 */ { "bits"    : 78, "bytes"   : 9 },
    /* 9 */ { "bits"    : 48, "bytes"   : 6 },
    /* 10 */ { "bits"    : 36, "bytes"   : 4 },
    /* 11 */ { "bits"    : 20, "bytes"   : 2 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^30 + x^28 + x^27 + x^25 + x^19 + x^14 + x^11 + x^8 + x^7 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x15a0849e7",
    "koopman"    : "0xAD0424F3",
    "normal"     : "0x5a0849e7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 427053, "bytes"   : 53381 },
    /* 5 */ { "bits"    : 817, "bytes"   : 102 },
    /* 6 */ { "bits"    : 522, "bytes"   : 65 },
    /* 7 */ { "bits"    : 149, "bytes"   : 18 },
    /* 8 */ { "bits"    : 63, "bytes"   : 7 },
    /* 9 */ { "bits"    : 27, "bytes"   : 3 },
    /* 10 */ { "bits"    : 19, "bytes"   : 2 },
    /* 11 */ { "bits"    : 19, "bytes"   : 2 },
    /* 12 */ { "bits"    : 19, "bytes"   : 2 },
    /* 13 */ { "bits"    : 9, "bytes"   : 1 },
    /* 14 */ { "bits"    : 9, "bytes"   : 1 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^30 + x^29 + x^26 + x^25 + x^22 + x^21 + x^20 + x^16 + x^14 + x^12 + x^11 + x^9 + x^8 + x^7 + x^5 + x^3 + x^2 + 1",
    "degree"     : 32,
    "explicit"   : "0x166715bad",
    "koopman"    : "0xB338ADD6",
    "normal"     : "0x66715bad"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 40931, "bytes"   : 5116 },
    /* 5 */ { "bits"    : 1969, "bytes"   : 246 },
    /* 6 */ { "bits"    : 224, "bytes"   : 28 },
    /* 7 */ { "bits"    : 198, "bytes"   : 24 },
    /* 8 */ { "bits"    : 63, "bytes"   : 7 },
    /* 9 */ { "bits"    : 63, "bytes"   : 7 },
    /* 10 */ { "bits"    : 58, "bytes"   : 7 },
    /* 11 */ { "bits"    : 25, "bytes"   : 3 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 },
    /* 13 */ { "bits"    : 11, "bytes"   : 1 },
    /* 14 */ { "bits"    : 5, "bytes"   : 0 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^30 + x^29 + x^27 + x^24 + x^21 + x^20 + x^19 + x^13 + x^12 + x^11 + x^8 + x^5 + x^3 + x^2 + 1",
    "degree"     : 32,
    "explicit"   : "0x16938392d",
    "koopman"    : "0xB49C1C96",
    "normal"     : "0x6938392d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 484, "bytes"   : 60 },
    /* 4 */ { "bits"    : 484, "bytes"   : 60 },
    /* 5 */ { "bits"    : 101, "bytes"   : 12 },
    /* 6 */ { "bits"    : 101, "bytes"   : 12 },
    /* 7 */ { "bits"    : 101, "bytes"   : 12 },
    /* 8 */ { "bits"    : 101, "bytes"   : 12 },
    /* 9 */ { "bits"    : 100, "bytes"   : 12 },
    /* 10 */ { "bits"    : 100, "bytes"   : 12 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 6, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^30 + x^29 + x^28 + x^26 + x^20 + x^19 + x^17 + x^16 + x^15 + x^11 + x^10 + x^7 + x^6 + x^4 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x1741b8cd7",
    "koopman"    : "0xBA0DC66B",
    "normal"     : "0x741b8cd7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 114663, "bytes"   : 14332 },
    /* 4 */ { "bits"    : 114663, "bytes"   : 14332 },
    /* 5 */ { "bits"    : 16360, "bytes"   : 2045 },
    /* 6 */ { "bits"    : 16360, "bytes"   : 2045 },
    /* 7 */ { "bits"    : 152, "bytes"   : 19 },
    /* 8 */ { "bits"    : 152, "bytes"   : 19 },
    /* 9 */ { "bits"    : 18, "bytes"   : 2 },
    /* 10 */ { "bits"    : 18, "bytes"   : 2 },
    /* 11 */ { "bits"    : 16, "bytes"   : 2 },
    /* 12 */ { "bits"    : 16, "bytes"   : 2 },
    /* 13 */ { "bits"    : 4, "bytes"   : 0 },
    /* 14 */ { "bits"    : 4, "bytes"   : 0 },
    /* 15 */ { "bits"    : 2, "bytes"   : 0 },
    /* 16 */ { "bits"    : 2, "bytes"   : 0 },
    /* 17 */ { "bits"    : 2, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^31 + x^24 + x^22 + x^16 + x^14 + x^8 + x^7 + x^5 + x^3 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x1814141ab",
    "koopman"    : "0xC0A0A0D5",
    "normal"     : "0x814141ab"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483615, "bytes"   : 268435451 },
    /* 4 */ { "bits"    : 2147483615, "bytes"   : 268435451 },
    /* 5 */ { "bits"    : 2275, "bytes"   : 284 },
    /* 6 */ { "bits"    : 2275, "bytes"   : 284 },
    /* 7 */ { "bits"    : 160, "bytes"   : 20 },
    /* 8 */ { "bits"    : 160, "bytes"   : 20 },
    /* 9 */ { "bits"    : 34, "bytes"   : 4 },
    /* 10 */ { "bits"    : 34, "bytes"   : 4 },
    /* 11 */ { "bits"    : 7, "bytes"   : 0 },
    /* 12 */ { "bits"    : 7, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^31 + x^28 + x^25 + x^24 + x^23 + x^21 + x^18 + x^11 + x^8 + x^7 + x^6 + x^5 + x^3 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x193a409eb",
    "koopman"    : "0xC9D204F5",
    "normal"     : "0x93a409eb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2147483615, "bytes"   : 268435451 },
    /* 4 */ { "bits"    : 2147483615, "bytes"   : 268435451 },
    /* 5 */ { "bits"    : 6167, "bytes"   : 770 },
    /* 6 */ { "bits"    : 6167, "bytes"   : 770 },
    /* 7 */ { "bits"    : 148, "bytes"   : 18 },
    /* 8 */ { "bits"    : 148, "bytes"   : 18 },
    /* 9 */ { "bits"    : 44, "bytes"   : 5 },
    /* 10 */ { "bits"    : 44, "bytes"   : 5 },
    /* 11 */ { "bits"    : 25, "bytes"   : 3 },
    /* 12 */ { "bits"    : 25, "bytes"   : 3 },
    /* 13 */ { "bits"    : 8, "bytes"   : 1 },
    /* 14 */ { "bits"    : 8, "bytes"   : 1 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 },
    /* 16 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^31 + x^29 + x^26 + x^24 + x^23 + x^16 + x^15 + x^14 + x^12 + x^11 + x^10 + x^9 + x^3 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x1a581de0f",
    "koopman"    : "0xD2C0EF07",
    "normal"     : "0xa581de0f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 50057, "bytes"   : 6257 },
    /* 5 */ { "bits"    : 971, "bytes"   : 121 },
    /* 6 */ { "bits"    : 625, "bytes"   : 78 },
    /* 7 */ { "bits"    : 153, "bytes"   : 19 },
    /* 8 */ { "bits"    : 91, "bytes"   : 11 },
    /* 9 */ { "bits"    : 90, "bytes"   : 11 },
    /* 10 */ { "bits"    : 39, "bytes"   : 4 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 5, "bytes"   : 0 },
    /* 15 */ { "bits"    : 1, "bytes"   : 0 },
    /* 16 */ { "bits"    : 1, "bytes"   : 0 },
    /* 17 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^31 + x^29 + x^27 + x^21 + x^20 + x^17 + x^16 + x^15 + x^12 + x^11 + x^5 + x^3 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x1a833982b",
    "koopman"    : "0xD419CC15",
    "normal"     : "0xa833982b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65505, "bytes"   : 8188 },
    /* 4 */ { "bits"    : 65505, "bytes"   : 8188 },
    /* 5 */ { "bits"    : 65505, "bytes"   : 8188 },
    /* 6 */ { "bits"    : 1060, "bytes"   : 132 },
    /* 7 */ { "bits"    : 81, "bytes"   : 10 },
    /* 8 */ { "bits"    : 58, "bytes"   : 7 },
    /* 9 */ { "bits"    : 27, "bytes"   : 3 },
    /* 10 */ { "bits"    : 27, "bytes"   : 3 },
    /* 11 */ { "bits"    : 21, "bytes"   : 2 },
    /* 12 */ { "bits"    : 17, "bytes"   : 2 },
    /* 13 */ { "bits"    : 3, "bytes"   : 0 },
    /* 14 */ { "bits"    : 3, "bytes"   : 0 },
    /* 15 */ { "bits"    : 3, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^31 + x^30 + x^27 + x^23 + x^22 + x^21 + x^20 + x^18 + x^17 + x^15 + x^12 + x^11 + x^7 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x1c8f698af",
    "koopman"    : "0xE47B4C57",
    "normal"     : "0xc8f698af"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967263, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 58599, "bytes"   : 7324 },
    /* 5 */ { "bits"    : 3333, "bytes"   : 416 },
    /* 6 */ { "bits"    : 722, "bytes"   : 90 },
    /* 7 */ { "bits"    : 232, "bytes"   : 29 },
    /* 8 */ { "bits"    : 107, "bytes"   : 13 },
    /* 9 */ { "bits"    : 59, "bytes"   : 7 },
    /* 10 */ { "bits"    : 27, "bytes"   : 3 },
    /* 11 */ { "bits"    : 6, "bytes"   : 0 },
    /* 12 */ { "bits"    : 6, "bytes"   : 0 },
    /* 13 */ { "bits"    : 6, "bytes"   : 0 },
    /* 14 */ { "bits"    : 6, "bytes"   : 0 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 6, "bytes"   : 0 },
    /* 17 */ { "bits"    : 6, "bytes"   : 0 },
    /* 18 */ { "bits"    : 4, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^31 + x^30 + x^28 + x^24 + x^21 + x^15 + x^14 + x^9 + x^8 + x^7 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x1d120c3b7",
    "koopman"    : "0xE89061DB",
    "normal"     : "0xd120c3b7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 469503982, "bytes"   : 58687997 },
    /* 4 */ { "bits"    : 469503982, "bytes"   : 58687997 },
    /* 5 */ { "bits"    : 2782, "bytes"   : 347 },
    /* 6 */ { "bits"    : 2782, "bytes"   : 347 },
    /* 7 */ { "bits"    : 128, "bytes"   : 16 },
    /* 8 */ { "bits"    : 128, "bytes"   : 16 },
    /* 9 */ { "bits"    : 38, "bytes"   : 4 },
    /* 10 */ { "bits"    : 38, "bytes"   : 4 },
    /* 11 */ { "bits"    : 21, "bytes"   : 2 },
    /* 12 */ { "bits"    : 21, "bytes"   : 2 },
    /* 13 */ { "bits"    : 13, "bytes"   : 1 },
    /* 14 */ { "bits"    : 13, "bytes"   : 1 },
    /* 15 */ { "bits"    : 13, "bytes"   : 1 },
    /* 16 */ { "bits"    : 13, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^31 + x^30 + x^29 + x^28 + x^24 + x^23 + x^20 + x^17 + x^13 + x^11 + x^4 + x^2 + 1",
    "degree"     : 32,
    "explicit"   : "0x1f1922815",
    "koopman"    : "0xF8C9140A",
    "normal"     : "0xf1922815"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2014, "bytes"   : 251 },
    /* 4 */ { "bits"    : 2014, "bytes"   : 251 },
    /* 5 */ { "bits"    : 992, "bytes"   : 124 },
    /* 6 */ { "bits"    : 992, "bytes"   : 124 },
    /* 7 */ { "bits"    : 992, "bytes"   : 124 },
    /* 8 */ { "bits"    : 992, "bytes"   : 124 },
    /* 9 */ { "bits"    : 66, "bytes"   : 8 },
    /* 10 */ { "bits"    : 66, "bytes"   : 8 },
    /* 11 */ { "bits"    : 16, "bytes"   : 2 },
    /* 12 */ { "bits"    : 16, "bytes"   : 2 },
    /* 13 */ { "bits"    : 12, "bytes"   : 1 },
    /* 14 */ { "bits"    : 12, "bytes"   : 1 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^31 + x^30 + x^29 + x^28 + x^26 + x^23 + x^21 + x^19 + x^18 + x^15 + x^14 + x^13 + x^12 + x^11 + x^9 + x^8 + x^4 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x1f4acfb13",
    "koopman"    : "0xFA567D89",
    "normal"     : "0xf4acfb13"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 65502, "bytes"   : 8187 },
    /* 4 */ { "bits"    : 65502, "bytes"   : 8187 },
    /* 5 */ { "bits"    : 32736, "bytes"   : 4092 },
    /* 6 */ { "bits"    : 32736, "bytes"   : 4092 },
    /* 7 */ { "bits"    : 274, "bytes"   : 34 },
    /* 8 */ { "bits"    : 274, "bytes"   : 34 },
    /* 9 */ { "bits"    : 24, "bytes"   : 3 },
    /* 10 */ { "bits"    : 24, "bytes"   : 3 },
    /* 11 */ { "bits"    : 11, "bytes"   : 1 },
    /* 12 */ { "bits"    : 11, "bytes"   : 1 },
    /* 13 */ { "bits"    : 5, "bytes"   : 0 },
    /* 14 */ { "bits"    : 5, "bytes"   : 0 },
    /* 15 */ { "bits"    : 4, "bytes"   : 0 },
    /* 16 */ { "bits"    : 4, "bytes"   : 0 },
    /* 17 */ { "bits"    : 3, "bytes"   : 0 },
    /* 18 */ { "bits"    : 3, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 },
    /* 20 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^32 + x^31 + x^30 + x^29 + x^28 + x^26 + x^25 + x^23 + x^21 + x^19 + x^18 + x^15 + x^14 + x^13 + x^12 + x^11 + x^9 + x^8 + x^4 + x^1 + 1",
    "degree"     : 32,
    "explicit"   : "0x1f6acfb13",
    "koopman"    : "0xFB567D89",
    "normal"     : "0xf6acfb13"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 12582874, "bytes"   : 1572859 },
    /* 4 */ { "bits"    : 105056, "bytes"   : 13132 },
    /* 5 */ { "bits"    : 2922, "bytes"   : 365 },
    /* 6 */ { "bits"    : 383, "bytes"   : 47 },
    /* 7 */ { "bits"    : 146, "bytes"   : 18 },
    /* 8 */ { "bits"    : 101, "bytes"   : 12 },
    /* 9 */ { "bits"    : 57, "bytes"   : 7 },
    /* 10 */ { "bits"    : 36, "bytes"   : 4 },
    /* 11 */ { "bits"    : 12, "bytes"   : 1 },
    /* 12 */ { "bits"    : 12, "bytes"   : 1 },
    /* 13 */ { "bits"    : 12, "bytes"   : 1 },
    /* 14 */ { "bits"    : 7, "bytes"   : 0 },
    /* 15 */ { "bits"    : 6, "bytes"   : 0 },
    /* 16 */ { "bits"    : 4, "bytes"   : 0 },
    /* 17 */ { "bits"    : 3, "bytes"   : 0 },
    /* 18 */ { "bits"    : 2, "bytes"   : 0 },
    /* 19 */ { "bits"    : 1, "bytes"   : 0 },
    /* 20 */ { "bits"    : 1, "bytes"   : 0 },
    /* 21 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^33 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 33,
    "explicit"   : "0x20000001f",
    "koopman"    : "0x10000000F",
    "normal"     : "0x1f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294967262, "bytes"   : 536870907 },
    /* 4 */ { "bits"    : 4294967262, "bytes"   : 536870907 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^33 + x^6 + x^4 + x^1 + 1",
    "degree"     : 33,
    "explicit"   : "0x200000053",
    "koopman"    : "0x100000029",
    "normal"     : "0x53"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8589934558, "bytes"   : 1073741819 },
    /* 4 */ { "bits"    : 143956, "bytes"   : 17994 },
    /* 5 */ { "bits"    : 4539, "bytes"   : 567 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^33 + x^7 + x^4 + x^3 + x^2 + 1",
    "degree"     : 33,
    "explicit"   : "0x20000009d",
    "koopman"    : "0x10000004E",
    "normal"     : "0x9d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4294434784, "bytes"   : 536804348 },
    /* 4 */ { "bits"    : 4294434784, "bytes"   : 536804348 },
    /* 5 */ { "bits"    : 4997, "bytes"   : 624 },
    /* 6 */ { "bits"    : 4997, "bytes"   : 624 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^34 + x^7 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 34,
    "explicit"   : "0x4000000e7",
    "koopman"    : "0x200000073",
    "normal"     : "0xe7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 17179869149, "bytes"   : 2147483643 },
    /* 4 */ { "bits"    : 161078, "bytes"   : 20134 },
    /* 5 */ { "bits"    : 5332, "bytes"   : 666 },
    /* 6 */ { "bits"    : 677, "bytes"   : 84 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^34 + x^8 + x^5 + 1",
    "degree"     : 34,
    "explicit"   : "0x400000121",
    "koopman"    : "0x200000090",
    "normal"     : "0x121"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8589934557, "bytes"   : 1073741819 },
    /* 4 */ { "bits"    : 8589934557, "bytes"   : 1073741819 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^34 + x^8 + x^7 + x^6 + x^1 + 1",
    "degree"     : 34,
    "explicit"   : "0x4000001c3",
    "koopman"    : "0x2000000E1",
    "normal"     : "0x1c3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 114640, "bytes"   : 14330 },
    /* 4 */ { "bits"    : 114640, "bytes"   : 14330 },
    /* 5 */ { "bits"    : 8164, "bytes"   : 1020 },
    /* 6 */ { "bits"    : 8164, "bytes"   : 1020 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^35 + x^2 + 1",
    "degree"     : 35,
    "explicit"   : "0x800000005",
    "koopman"    : "0x400000002",
    "normal"     : "0x5"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 34359738332, "bytes"   : 4294967291 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^35 + x^5 + x^1 + 1",
    "degree"     : 35,
    "explicit"   : "0x800000023",
    "koopman"    : "0x400000011",
    "normal"     : "0x23"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 17179869148, "bytes"   : 2147483643 },
    /* 4 */ { "bits"    : 17179869148, "bytes"   : 2147483643 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^35 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 35,
    "explicit"   : "0x800000037",
    "koopman"    : "0x40000001B",
    "normal"     : "0x37"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1145044684, "bytes"   : 143130585 },
    /* 4 */ { "bits"    : 1145044684, "bytes"   : 143130585 },
    /* 5 */ { "bits"    : 7167, "bytes"   : 895 },
    /* 6 */ { "bits"    : 7167, "bytes"   : 895 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^36 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 36,
    "explicit"   : "0x100000002f",
    "koopman"    : "0x800000017",
    "normal"     : "0x2f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 34359738331, "bytes"   : 4294967291 },
    /* 4 */ { "bits"    : 34359738331, "bytes"   : 4294967291 },
    /* 5 */ { "bits"    : 6785, "bytes"   : 848 },
    /* 6 */ { "bits"    : 6785, "bytes"   : 848 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^36 + x^6 + x^5 + x^4 + x^2 + x^1 + 1",
    "degree"     : 36,
    "explicit"   : "0x1000000077",
    "koopman"    : "0x80000003B",
    "normal"     : "0x77"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 68719476699, "bytes"   : 8589934587 },
    /* 4 */ { "bits"    : 685957, "bytes"   : 85744 },
    /* 5 */ { "bits"    : 5208, "bytes"   : 651 },
    /* 6 */ { "bits"    : 1355, "bytes"   : 169 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^36 + x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + 1",
    "degree"     : 36,
    "explicit"   : "0x10000001f9",
    "koopman"    : "0x8000000FC",
    "normal"     : "0x1f9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 12884901846, "bytes"   : 1610612730 },
    /* 4 */ { "bits"    : 12884901846, "bytes"   : 1610612730 },
    /* 5 */ { "bits"    : 9486, "bytes"   : 1185 },
    /* 6 */ { "bits"    : 9486, "bytes"   : 1185 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^37 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 37,
    "explicit"   : "0x200000003f",
    "koopman"    : "0x100000001F",
    "normal"     : "0x3f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 137438953434, "bytes"   : 17179869179 },
    /* 4 */ { "bits"    : 678998, "bytes"   : 84874 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^37 + x^7 + x^1 + 1",
    "degree"     : 37,
    "explicit"   : "0x2000000083",
    "koopman"    : "0x1000000041",
    "normal"     : "0x83"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 68719476698, "bytes"   : 8589934587 },
    /* 4 */ { "bits"    : 68719476698, "bytes"   : 8589934587 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^37 + x^7 + x^6 + x^3 + x^1 + 1",
    "degree"     : 37,
    "explicit"   : "0x20000000cb",
    "koopman"    : "0x1000000065",
    "normal"     : "0xcb"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 60129542093, "bytes"   : 7516192761 },
    /* 4 */ { "bits"    : 60129542093, "bytes"   : 7516192761 },
    /* 5 */ { "bits"    : 11832, "bytes"   : 1479 },
    /* 6 */ { "bits"    : 11832, "bytes"   : 1479 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^38 + x^2 + x^1 + 1",
    "degree"     : 38,
    "explicit"   : "0x4000000007",
    "koopman"    : "0x2000000003",
    "normal"     : "0x7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 137438953433, "bytes"   : 17179869179 },
    /* 4 */ { "bits"    : 137438953433, "bytes"   : 17179869179 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^38 + x^6 + x^5 + x^1 + 1",
    "degree"     : 38,
    "explicit"   : "0x4000000063",
    "koopman"    : "0x2000000031",
    "normal"     : "0x63"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 274877906905, "bytes"   : 34359738363 },
    /* 4 */ { "bits"    : 1004990, "bytes"   : 125623 },
    /* 5 */ { "bits"    : 12827, "bytes"   : 1603 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^38 + x^7 + x^6 + x^5 + x^3 + 1",
    "degree"     : 38,
    "explicit"   : "0x40000000e9",
    "koopman"    : "0x2000000074",
    "normal"     : "0xe9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 27380416423, "bytes"   : 3422552052 },
    /* 4 */ { "bits"    : 27380416423, "bytes"   : 3422552052 },
    /* 5 */ { "bits"    : 16597, "bytes"   : 2074 },
    /* 6 */ { "bits"    : 16597, "bytes"   : 2074 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^39 + x^4 + 1",
    "degree"     : 39,
    "explicit"   : "0x8000000011",
    "koopman"    : "0x4000000008",
    "normal"     : "0x11"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 549755813848, "bytes"   : 68719476731 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^39 + x^4 + x^2 + 1",
    "degree"     : 39,
    "explicit"   : "0x8000000015",
    "koopman"    : "0x400000000A",
    "normal"     : "0x15"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 274877906904, "bytes"   : 34359738363 },
    /* 4 */ { "bits"    : 274877906904, "bytes"   : 34359738363 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^40 + x^5 + x^4 + 1",
    "degree"     : 40,
    "explicit"   : "0x10000000031",
    "koopman"    : "0x8000000018",
    "normal"     : "0x31"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 549755813847, "bytes"   : 68719476730 },
    /* 4 */ { "bits"    : 549755813847, "bytes"   : 68719476730 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^40 + x^5 + x^4 + x^3 + 1",
    "degree"     : 40,
    "explicit"   : "0x10000000039",
    "koopman"    : "0x800000001C",
    "normal"     : "0x39"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1099511627735, "bytes"   : 137438953466 },
    /* 4 */ { "bits"    : 1544868, "bytes"   : 193108 },
    /* 5 */ { "bits"    : 24009, "bytes"   : 3001 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^40 + x^8 + x^7 + x^6 + x^5 + x^2 + x^1 + 1",
    "degree"     : 40,
    "explicit"   : "0x100000001e7",
    "koopman"    : "0x80000000F3",
    "normal"     : "0x1e7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 515396075465, "bytes"   : 64424509433 },
    /* 4 */ { "bits"    : 515396075465, "bytes"   : 64424509433 },
    /* 5 */ { "bits"    : 26722, "bytes"   : 3340 },
    /* 6 */ { "bits"    : 26722, "bytes"   : 3340 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 },
    /* 8 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^41 + x^3 + 1",
    "degree"     : 41,
    "explicit"   : "0x20000000009",
    "koopman"    : "0x10000000004",
    "normal"     : "0x9"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2199023255510, "bytes"   : 274877906938 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^41 + x^7 + x^6 + x^4 + x^1 + 1",
    "degree"     : 41,
    "explicit"   : "0x200000000d3",
    "koopman"    : "0x10000000069",
    "normal"     : "0xd3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 1099511627734, "bytes"   : 137438953466 },
    /* 4 */ { "bits"    : 1099511627734, "bytes"   : 137438953466 },
    /* 5 */ { "bits"    : 17530, "bytes"   : 2191 },
    /* 6 */ { "bits"    : 17530, "bytes"   : 2191 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^42 + x^5 + x^4 + x^3 + x^2 + x^1 + 1",
    "degree"     : 42,
    "explicit"   : "0x4000000003f",
    "koopman"    : "0x2000000001F",
    "normal"     : "0x3f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4398046511061, "bytes"   : 549755813882 },
    /* 4 */ { "bits"    : 3063857, "bytes"   : 382982 },
    /* 5 */ { "bits"    : 1, "bytes"   : 0 },
    /* 6 */ { "bits"    : 1, "bytes"   : 0 },
    /* 7 */ { "bits"    : 1, "bytes"   : 0 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^42 + x^6 + x^5 + 1",
    "degree"     : 42,
    "explicit"   : "0x40000000061",
    "koopman"    : "0x20000000030",
    "normal"     : "0x61"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 2199023255509, "bytes"   : 274877906938 },
    /* 4 */ { "bits"    : 2199023255509, "bytes"   : 274877906938 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^43 + x^6 + x^4 + x^3 + 1",
    "degree"     : 43,
    "explicit"   : "0x80000000059",
    "koopman"    : "0x4000000002C",
    "normal"     : "0x59"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8796093022164, "bytes"   : 1099511627770 },
    /* 4 */ { "bits"    : 1468724, "bytes"   : 183590 },
    /* 5 */ { "bits"    : 28256, "bytes"   : 3532 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^43 + x^7 + x^5 + x^3 + x^1 + 1",
    "degree"     : 43,
    "explicit"   : "0x800000000ab",
    "koopman"    : "0x40000000055",
    "normal"     : "0xab"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 4398046511060, "bytes"   : 549755813882 },
    /* 4 */ { "bits"    : 4398046511060, "bytes"   : 549755813882 },
    /* 5 */ { "bits"    : 30892, "bytes"   : 3861 },
    /* 6 */ { "bits"    : 30892, "bytes"   : 3861 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^44 + x^6 + x^4 + x^3 + x^2 + 1",
    "degree"     : 44,
    "explicit"   : "0x10000000005d",
    "koopman"    : "0x8000000002E",
    "normal"     : "0x5d"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8796093022163, "bytes"   : 1099511627770 },
    /* 4 */ { "bits"    : 8796093022163, "bytes"   : 1099511627770 },
    /* 5 */ { "bits"    : 24415, "bytes"   : 3051 },
    /* 6 */ { "bits"    : 24415, "bytes"   : 3051 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^44 + x^6 + x^5 + x^2 + 1",
    "degree"     : 44,
    "explicit"   : "0x100000000065",
    "koopman"    : "0x80000000032",
    "normal"     : "0x65"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 17592186044371, "bytes"   : 2199023255546 },
    /* 4 */ { "bits"    : 5219669, "bytes"   : 652458 },
    /* 5 */ { "bits"    : 36719, "bytes"   : 4589 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^44 + x^8 + x^7 + x^5 + x^1 + 1",
    "degree"     : 44,
    "explicit"   : "0x1000000001a3",
    "koopman"    : "0x800000000D1",
    "normal"     : "0x1a3"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 8778913152469, "bytes"   : 1097364144058 },
    /* 4 */ { "bits"    : 8778913152469, "bytes"   : 1097364144058 },
    /* 5 */ { "bits"    : 58116, "bytes"   : 7264 },
    /* 6 */ { "bits"    : 58116, "bytes"   : 7264 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^45 + x^4 + x^3 + x^1 + 1",
    "degree"     : 45,
    "explicit"   : "0x20000000001b",
    "koopman"    : "0x10000000000D",
    "normal"     : "0x1b"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 35184372088786, "bytes"   : 4398046511098 },
    /* 4 */ { "bits"    : 8477942, "bytes"   : 1059742 },
    /* 5 */ { "bits"    : 89960, "bytes"   : 11245 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^45 + x^6 + x^2 + 1",
    "degree"     : 45,
    "explicit"   : "0x200000000045",
    "koopman"    : "0x100000000022",
    "normal"     : "0x45"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 17592186044370, "bytes"   : 2199023255546 },
    /* 4 */ { "bits"    : 17592186044370, "bytes"   : 2199023255546 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^46 + x^5 + x^2 + 1",
    "degree"     : 46,
    "explicit"   : "0x400000000025",
    "koopman"    : "0x200000000012",
    "normal"     : "0x25"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 35184372088785, "bytes"   : 4398046511098 },
    /* 4 */ { "bits"    : 35184372088785, "bytes"   : 4398046511098 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^46 + x^8 + x^5 + x^3 + x^2 + x^1 + 1",
    "degree"     : 46,
    "explicit"   : "0x40000000012f",
    "koopman"    : "0x200000000097",
    "normal"     : "0x12f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 70368744177617, "bytes"   : 8796093022202 },
    /* 4 */ { "bits"    : 11479602, "bytes"   : 1434950 },
    /* 5 */ { "bits"    : 57673, "bytes"   : 7209 },
    /* 6 */ { "bits"    : 5920, "bytes"   : 740 },
    /* 7 */ { "bits"    : 1274, "bytes"   : 159 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^47 + x^5 + 1",
    "degree"     : 47,
    "explicit"   : "0x800000000021",
    "koopman"    : "0x400000000010",
    "normal"     : "0x21"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 140737488355280, "bytes"   : 17592186044410 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^47 + x^6 + x^3 + x^2 + x^1 + 1",
    "degree"     : 47,
    "explicit"   : "0x80000000004f",
    "koopman"    : "0x400000000027",
    "normal"     : "0x4f"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 70368744177616, "bytes"   : 8796093022202 },
    /* 4 */ { "bits"    : 70368744177616, "bytes"   : 8796093022202 },
    /* 5 */ { "bits"    : 82774, "bytes"   : 10346 },
    /* 6 */ { "bits"    : 82774, "bytes"   : 10346 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^48 + x^2 + x^1 + 1",
    "degree"     : 48,
    "explicit"   : "0x1000000000007",
    "koopman"    : "0x800000000003",
    "normal"     : "0x7"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 140737488355279, "bytes"   : 17592186044409 },
    /* 4 */ { "bits"    : 140737488355279, "bytes"   : 17592186044409 }
  ],
}
,{
  "id" : {
    "polynomial" : "x^40 + x^26 + x^23 + x^17 + x^3 + 1",
    "degree"     : 40,
    "explicit"   : "0x10004820009",
    "koopman"    : "0x8002410004",
    "normal"     : "0x4820009"
  },
  "hd" :     [null, null, null,
    /* 3 */ { "bits"    : 3014593, "bytes"   : 376824 },
    /* 4 */ { "bits"    : 3014593, "bytes"   : 376824 },
    /* 5 */ { "bits"    : 258, "bytes"   : 32 },
    /* 6 */ { "bits"    : 258, "bytes"   : 32 }
  ],
}
,] );

console.log("Try these queries to get you started:\n");
console.log("");
console.log("polynomials.find({'HD' : 6});");
console.log("polynomials.find({'HD' : 6, 'len_bytes' : 1000});");
console.log("polynomials.find({'HD' : 6, 'len_bytes' : 13, 'degree' : 16});");
console.log("polynomials.find({'HD' : 4, 'len_bytes' : 200, 'degree' : 12});");

