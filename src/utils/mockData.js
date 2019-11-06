export const challenges = [
  {
    "state": "published",
    "title": "Challenge 2",
    "created": "2018-12-10T09:30:46",
    "lastModified": "2018-12-10T09:30:46",
    "published": "2018-12-18T10:34:11",
    "closed": null,
    "config": {
      "timePerSessionInMs": 1200,
      "taskDescription": "Task Description Challenge 2",
      "challengeDescription": "Challenge Description Challenge 2"
    },
    "numberIdeas": 12,
    "numberSessions": 2,
    "sessionLink": "https://bit.ly/2ErydFz",
    "_links": {
      "self": {
        "href": "http://localhost:8080/api/challenges/d409963e-43dd-429c-9f8f-f1fb3ebc1425"
      },
      "challenge": {
        "href": "http://localhost:8080/api/challenges/d409963e-43dd-429c-9f8f-f1fb3ebc1425"
      },
      "findByChallengeId": [
        {
          "href": "http://localhost:8080/api/ideas/search/findByChallengeId?challengeId=d409963e-43dd-429c-9f8f-f1fb3ebc1425"
        },
        {
          "href": "http://localhost:8080/api/ideationSessions/search/findByChallengeId?challengeId=d409963e-43dd-429c-9f8f-f1fb3ebc1425"
        }
      ]
    }
  },
  {
    "state": "draft",
    "title": "Challenge 1",
    "created": "2018-11-18T10:34:11",
    "lastModified": "2018-12-18T10:34:11",
    "published": null,
    "closed": null,
    "config": null,
    "numberIdeas": 0,
    "numberSessions": 0,
    "sessionLink": null,
    "_links": {
      "self": {
        "href": "http://localhost:8080/api/challenges/d2f8e393-5a88-4b48-a290-11dc47fa01e6"
      },
      "challenge": {
        "href": "http://localhost:8080/api/challenges/d2f8e393-5a88-4b48-a290-11dc47fa01e6"
      },
      "findByChallengeId": [
        {
          "href": "http://localhost:8080/api/ideas/search/findByChallengeId?challengeId=d2f8e393-5a88-4b48-a290-11dc47fa01e6"
        },
        {
          "href": "http://localhost:8080/api/ideationSessions/search/findByChallengeId?challengeId=d2f8e393-5a88-4b48-a290-11dc47fa01e6"
        }
      ]
    }
  },
  {
    "state": "published",
    "title": "Challenge 3",
    "created": "2018-09-20T10:40:08",
    "lastModified": "2018-12-18T10:34:11",
    "published": "2018-09-28T10:35:40",
    "closed": "2018-10-04T10:40:25",
    "config": {
      "timePerSessionInMs": 1200,
      "taskDescription": "Task Description Challenge 3",
      "challengeDescription": "Challenge Description Challenge 3",
      "_links": {
        "inspirations": {
          "href": "http://localhost:8080/api/inspirations/9a83a2ef-e229-4eb7-b2d3-af8e51a523e0"
        }
      }
    },
    "numberIdeas": 158,
    "numberSessions": 12,
    "sessionLink": "https://bit.ly/2EqWhYe",
    "_links": {
      "self": {
        "href": "http://localhost:8080/api/challenges/29d164d6-2d04-467e-8754-f23f0f1a3a57"
      },
      "challenge": {
        "href": "http://localhost:8080/api/challenges/29d164d6-2d04-467e-8754-f23f0f1a3a57"
      },
      "findByChallengeId": [
        {
          "href": "http://localhost:8080/api/ideas/search/findByChallengeId?challengeId=29d164d6-2d04-467e-8754-f23f0f1a3a57"
        },
        {
          "href": "http://localhost:8080/api/ideationSessions/search/findByChallengeId?challengeId=29d164d6-2d04-467e-8754-f23f0f1a3a57"
        }
      ]
    }
  }
]

export const userInfo = {
  "username": "admin",
  "firstname": "admin",
  "lastname": "admin",
  "email": "admin@admin.com",
  "authorities": [
    {
      "authority": "ROLE_IDEATOR"
    },
    {
      "authority": "ROLE_MODERATOR"
    }
  ],
  "enabled": true
}

export const icvData = {
  annotation_candidates: [{
      offset: 59,
      resource_candidates: [{
          confidence: 0.15384615384615385,
          description: "Shoelaces, sometimes called shoestrings (US English) or bootlaces (UK English), are a system commonly used to secure shoes, boots and other footwear.They typically consist of a pair of strings or cords, one for each shoe, finished off at both ends with stiff sections, known as aglets. Each shoelace typically passes through a series of holes, eyelets, loops or hooks on either side of the shoe. Loosening the lacing allows the shoe to open wide enough for the foot to be inserted or removed. Tightening the lacing and tying off the ends secures the foot within the shoe.",
          label: "Shoelaces",
          offset: 59,
          resource: "http://dbpedia.org/resource/Shoelaces",
          source: "babelfy",
          text: "laces",
          thumbnail: "http://commons.wikimedia.org/wiki/Special:FilePath/Shoelaces_20050719_001.jpg?width=300",
          token_span: {
            end: 11,
            start: 11
          }
        },
        {
          confidence: 0.07692307692307693,
          description: "Lace is a delicate fabric made of yarn or thread in an open weblike pattern, made by machine or by hand. Originally linen, silk, gold, or silver threads were used. Now lace is often made with cotton thread, although linen and silk threads are still available. Manufactured lace may be made of synthetic fiber. A few modern artists make lace with a fine copper or silver wire instead of thread.",
          label: "Lace",
          offset: 59,
          resource: "http://dbpedia.org/resource/Lace",
          source: "babelfy",
          text: "laces",
          thumbnail: "http://commons.wikimedia.org/wiki/Special:FilePath/Verknipte_kantstrook.JPG?width=300",
          token_span: {
            end: 11,
            start: 11
          }
        }
      ],
      text: "laces",
      token_span: {
        end: 11,
        start: 11
      }
    },
    {
      offset: 42,
      resource_candidates: [{
          confidence: 0.5,
          description: "In object-oriented programming, a protocol or interface is a common means for unrelated objects to communicate with each other. These are definitions of methods and values which the objects agree upon in order to co-operate. For example, in Java (where protocols are termed interfaces), the Comparable interface specifies a method compareTo() which implementing classes should implement. This means that a separate sorting method, for example, can sort any object which implements the Comparable interface, without having to know anything about the inner nature of the class (except that two of these objects can be compared by means of compareTo()). The protocol is a description of: 1. * The messages that are understood by the object. 2. * The arguments that these messages may be supplied with. 3. * The types of results that these messages return. 4. * The invariants that are preserved despite modifications to the state of an object. 5. * The exceptional situations that will be required to be handled by clients to the object. If the objects are fully encapsulated then the protocol will describe the only way in which objects may be accessed by other objects. Some programming languages provide explicit language support for protocols or interfaces (Ada, C#, D, Dart, Delphi, Go, Java, Logtalk, Object Pascal, Objective-C, PHP, Racket, Seed7, Swift). In C++ interfaces are known as abstract base classes and implemented using pure virtual functions. The object-oriented features in Perl also support interfaces. Although the Go programming language is not generally considered an object-oriented language, it does allow methods to be defined on user-defined types. Go has interface types that are compatible with any type that supports a given set of methods (the type does not need to explicitly implement the interface). The empty interface, interface{}, is compatible with all types. Note that functional programming and distributed programming languages have a concept which is also called a protocol, but whose meaning is subtly different (i.e. a specification of allowed exchanges of messages, emphasis on exchanges, not on messages). This difference is due to somewhat different assumptions of functional programming and object-oriented programming paradigms. In particular, the following are also considered as part of a protocol in these languages: 1. * The allowed sequences of messages, 2. * Restrictions placed on either participant in the communication, 3. * Expected effects that will occur as the message is handled. Type classes in languages like Haskell are used for many of the things that protocols are used for.",
          label: "Protocol (object-oriented programming)",
          offset: 42,
          resource: "http://dbpedia.org/resource/Protocol_(object-oriented_programming)",
          source: "babelfy",
          text: "interface",
          thumbnail: null,
          token_span: {
            end: 8,
            start: 8
          }
        },
        {
          confidence: 0.6346185670075278,
          description: "The user interface (UI), in the industrial design field of human–machine interaction, is the space where interactions between humans and machines occur. The goal of this interaction is to allow effective operation and control of the machine from the human end, whilst the machine simultaneously feeds back information that aids the operators' decision-making process. Examples of this broad concept of user interfaces include the interactive aspects of computer operating systems, hand tools, heavy machinery operator controls, and process controls. The design considerations applicable when creating user interfaces are related to or involve such disciplines as ergonomics and psychology. Generally, the goal of user interface design is to produce a user interface which makes it easy (self-explanatory), efficient, and enjoyable (user-friendly) to operate a machine in the way which produces the desired result. This generally means that the operator needs to provide minimal input to achieve the desired output, and also that the machine minimizes undesired outputs to the human. With the increased use of personal computers and the relative decline in societal awareness of heavy machinery, the term user interface is generally assumed to mean the graphical user interface, while industrial control panel and machinery control design discussions more commonly refer to human-machine interfaces. Other terms for user interface are man–machine interface (MMI) and when the machine in question is a computer human–computer interface.",
          label: "User interface",
          offset: 42,
          resource: "http://dbpedia.org/resource/User_interface",
          source: "spotlight",
          text: "interface",
          thumbnail: "http://commons.wikimedia.org/wiki/Special:FilePath/Reactable_Multitouch.jpg?width=300",
          token_span: {
            end: 8,
            start: 8
          }
        },
        {
          confidence: 0.22334694840538474,
          description: "In computer science, a graphical user interface (GUI /ɡuːiː/), is a type of user interface that allows users to interact with electronic devices through graphical icons and visual indicators such as secondary notation, instead of text-based user interfaces, typed command labels or text navigation. GUIs were introduced in reaction to the perceived steep learning curve of command-line interfaces (CLIs), which require commands to be typed on a computer keyboard. The actions in a GUI are usually performed through direct manipulation of the graphical elements. Beyond computers, GUIs are used in many handheld mobile devices such as MP3 players, portable media players, gaming devices, smartphones and smaller household, office and industrial equipment. The term GUI tends not to be applied to other lower-display resolution types of interfaces, such as video games (where head-up display (HUD) is preferred), or not restricted to flat screens, like volumetric displays because the term is restricted to the scope of two-dimensional display screens able to describe generic information, in the tradition of the computer science research at the Xerox Palo Alto Research Center (PARC).",
          label: "Graphical user interface",
          offset: 42,
          resource: "http://dbpedia.org/resource/Graphical_user_interface",
          source: "spotlight",
          text: "interface",
          thumbnail: "http://commons.wikimedia.org/wiki/Special:FilePath/X-Window-System.png?width=300",
          token_span: {
            end: 8,
            start: 8
          }
        }
      ],
      text: "interface",
      token_span: {
        end: 8,
        start: 8
      }
    },
    {
      offset: 22,
      resource_candidates: [{
        confidence: 0.38461538461538464,
        description: "A shoe is an item of footwear intended to protect and comfort the human foot while doing various activities. Shoes are also used as an item of decoration. The design of shoes has varied enormously through time and from culture to culture, with appearance originally being tied to function. Additionally, fashion has often dictated many design elements, such as whether shoes have very high heels or flat ones. Contemporary footwear varies widely in style, complexity and cost. Basic sandals may consist of only a thin sole and simple strap. High fashion shoes may be made of very expensive materials in complex construction and sell for thousands of dollars a pair. Other shoes are for very specific purposes, such as boots designed specifically for mountaineering or skiing. Traditionally, shoes have been made from leather, wood or canvas, but are increasingly made from rubber, plastics, and other petrochemical-derived materials. Though it has evolved over hundreds of thousands of years in relation to vastly varied terrain and climate conditions, the human foot is still vulnerable to environmental hazards such as sharp rocks and hot ground, against which, shoes can protect.",
        label: "Shoe",
        offset: 22,
        resource: "http://dbpedia.org/resource/Shoe",
        source: "babelfy",
        text: "shoes",
        thumbnail: "http://commons.wikimedia.org/wiki/Special:FilePath/Shoe_BNC.jpg?width=300",
        token_span: {
          end: 4,
          start: 4
        }
      }],
      text: "shoes",
      token_span: {
        end: 4,
        start: 4
      }
    },
    {
      offset: 35,
      resource_candidates: [{
          confidence: 0.40746487471173254,
          description: "In algebraic geometry, a proper morphism between schemes is an analog of a proper map between complex analytic spaces. Some authors call a proper variety over a field k a complete variety. For example, every projective variety over a field k is proper over k. A scheme X of finite type over the complex numbers (for example, a variety) is proper over C if and only if the space X(C) of complex points with the classical (Euclidean) topology is compact and Hausdorff. A closed immersion is proper. A morphism is finite if and only if it is proper and quasi-finite.",
          label: "Proper morphism",
          offset: 35,
          resource: "http://dbpedia.org/resource/Proper_morphism",
          source: "spotlight",
          text: "proper",
          thumbnail: null,
          token_span: {
            end: 7,
            start: 7
          }
        },
        {
          confidence: 0.322052134891062,
          description: "A proper noun is a noun that in its primary application refers to a unique entity, such as London, Jupiter, Sarah, or Microsoft, as distinguished from a common noun, which usually refers to a class of entities (city, planet, person, corporation), or non-unique instances of a specific class (a city, another planet, these persons, our corporation). Some proper nouns occur in plural form (optionally or exclusively), and then they refer to groups of entities considered as unique (the Hendersons, the Everglades, the Azores, the Pleiades). Proper nouns can also occur in secondary applications, for example modifying nouns (the Mozart experience; his Azores adventure), or in the role of common nouns (he's no Pavarotti; a few would-be Napoleons). The detailed definition of the term is problematic and to an extent governed by convention. A distinction is normally made in current linguistics between proper nouns and proper names. By this strict distinction, because the term noun is used for a class of single words (tree, beauty), only single-word proper names are proper nouns: Peter and Africa are both proper names and proper nouns; but Peter the Great and South Africa, while they are proper names, are not proper nouns. The term common name is not much used to contrast with proper name, but some linguists have used the term for that purpose. Sometimes proper names are called simply names; but that term is often used more broadly. Words derived from proper names are sometimes called proper adjectives (or proper adverbs, and so on), but not in mainstream linguistic theory. Not every noun or noun phrase that refers to a unique entity is a proper name. Blackness and chastity are common nouns, even if blackness and chastity are considered unique abstract entities. Few proper names have only one possible referent: there are many places named New Haven; Jupiter may refer to a planet, a god, a ship, or a symphony; at least one person has been named Mata Hari, but so have a horse, a song, and three films; there are towns and people named Toyota, as well as the company. In English, proper names in their primary application cannot normally be modified by an article or other determiner (such as any or another), although some may be taken to include the article the, as in the Netherlands, the Roaring Forties, or the Rolling Stones. A proper name may appear to refer by having a descriptive meaning, even though it does not (the Rolling Stones are not stones and do not roll; a woman named Rose is not a flower). Or if it had once been descriptive (and then perhaps not even a proper name at all), it may no longer be so (a location previously referred to as the new town may now have the proper name Newtown, though it is no longer new, and is now a city rather than a town). In English and many other languages, proper names and words derived from them are associated with capitalization; but the details are complex, and vary from language to language (French lundi, Canada, canadien; English Monday, Canada, Canadian). The study of proper names is sometimes called onomastics or onomatology while a rigorous analysis of the semantics of proper names is a matter for philosophy of language.",
          label: "Proper noun",
          offset: 35,
          resource: "http://dbpedia.org/resource/Proper_noun",
          source: "spotlight",
          text: "proper",
          thumbnail: null,
          token_span: {
            end: 7,
            start: 7
          }
        },
        {
          confidence: 0.13650252957481407,
          description: "In mathematics, a function between topological spaces is called proper if inverse images of compact subsets are compact. In algebraic geometry, the analogous concept is called a proper morphism.",
          label: "Proper map",
          offset: 35,
          resource: "http://dbpedia.org/resource/Proper_map",
          source: "spotlight",
          text: "proper",
          thumbnail: null,
          token_span: {
            end: 7,
            start: 7
          }
        }
      ],
      text: "proper",
      token_span: {
        end: 7,
        start: 7
      }
    }
  ],
  text: "how about some flying shoes with a proper interface in the laces"
};
