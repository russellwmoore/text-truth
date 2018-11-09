
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const toneAnalyzer = new ToneAnalyzerV3({
  iam_apikey: process.env.WATSON_API,
  version: '2017-09-21',
  url: 'https://gateway-wdc.watsonplatform.net/tone-analyzer/api'
});

var text = 'Nemegtomaia is a genus of oviraptorid dinosaur from what is now Mongolia that lived in the Late Cretaceous Period, about 70 million years ago. The first specimen was found in 1996, and became the basis of the new genus and species N. barsboldi in 2004. The original genus name was Nemegtia, but this was changed to Nemegtomaia in 2005, as the former name was preoccupied. The first part of the generic name refers to the Nemegt Basin, where the animal was found, and the second part means "good mother", in reference to the fact that oviraptorids are known to have brooded their eggs. The specific name honours the palaeontologist Rinchen Barsbold. Two more specimens were found in 2007, one of which was found on top of a nest with eggs, but the dinosaur had received its genus name before it was found associated with eggs. Nemegtomaia is estimated to have been around 2 m (7 ft) in length, and to have weighed 40 kg (85 lb). As an oviraptorosaur, it would have been feathered. It had a deep, narrow, and short skull, with an arched crest. It was toothless, had a short snout with a parrot-like beak, and a pair of tooth-like projections on its palate. It had three fingers; the first was largest and bore a strong claw. Nemegtomaia is classified as a member of the oviraptorid subfamily Ingeniinae, and it the only known member of this group with a cranial crest. Though Nemegtomaia has been used to suggest that oviraptorosaurs were flightless birds, the clade is generally considered a group of non-avian dinosaurs. The nesting Nemegtomaia specimen was placed on top of what was probably a ring of eggs, with its arms folded across them. None of the eggs are complete, but they are estimated to have been 5 to 6 cm (2 to 2.3 in) wide and 14 to 16 cm (5 to 6 in) long when intact. The specimen was found in a stratigraphic area that indicates Nemegtomaia preferred nesting near streams that would provide soft, sandy substrate and food. Nemegtomaia may have protected its eggs by covering them with its tail and wing feathers. The skeleton of the nesting specimen has damage that indicates it was scavenged by skin beetles. The diet of oviraptorids is uncertain, but their skulls are most similar to other animals that are known or thought to have been herbivorous. Nemegtomaia is known from the Nemegt and Baruungoyot Formations, which are thought to represent humid and arid environments that coexisted in the same area.'

var toneParams = {
  tone_input: { 'text': text },
  content_type: 'application/json'
};

toneAnalyzer.tone(toneParams, function (error, toneAnalysis) {
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.stringify(toneAnalysis, null, 2));
  }
});

module.exports = {
  toneAnalyzer,
  toneParams
}