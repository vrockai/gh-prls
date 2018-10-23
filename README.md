# gh-prls

# Install

`npm i gh-prls -g`

Tested with node v9.8.0.

# Usage

1. Set the `GITHUB_TOKEN` ENV variable to contain your personal access token (get your token on 
[https://github.com/settings/tokens](https://github.com/settings/tokens)), i.e.:
`export GITHUB_TOKEN="asdfrf234424d43d4d23"`
2. Run the command specifying your organization name as its first argument, i.e.:
```
$ gh-prls GMOD
Repo              Author           Title                                                                                    Reviewers  URL                                             
----------------  ---------------  ---------------------------------------------------------------------------------------  ---------  ------------------------------------------------
jbrowse           cmdcolin         Add unprocessed transcript glyph                                                                    https://github.com/GMOD/jbrowse/pull/1230       
jbrowse           rbuels           embedded mode docs                                                                                  https://github.com/GMOD/jbrowse/pull/1228       
jbrowse           garrettjstevens  Use @gmod/vcf                                                                                       https://github.com/GMOD/jbrowse/pull/1227       
jbrowse           hkmoon           Remove the zoomLevel = 1/200                                                                        https://github.com/GMOD/jbrowse/pull/1187       
Bio-Graphics      carandraug       typos and clarifications on documentation                                                           https://github.com/GMOD/Bio-Graphics/pull/27    
Bio-Graphics      gitter-badger    Add a Gitter chat link to README                                                                    https://github.com/GMOD/Bio-Graphics/pull/22    
Chado             jogoodma         Issue 65 - search_path issue with binloc functions used for featureloc indices                      https://github.com/GMOD/Chado/pull/66           
Chado             bradfordcondon   Project stock biomaterial linker tables                                                             https://github.com/GMOD/Chado/pull/55           
Chado             bradfordcondon   add type_id column to analysis table                                                                https://github.com/GMOD/Chado/pull/52           
Chado             bradfordcondon   MAGE description changes and minor table changes to accomodate next gen sequencing data  scottcain  https://github.com/GMOD/Chado/pull/50           
GBrowse-Adaptors  nathanweeks      Fix kent src paths in Bio-BigFile/README                                                            https://github.com/GMOD/GBrowse-Adaptors/pull/21
Apollo            nathandunn       Group searchbox - Test to review                                                                    https://github.com/GMOD/Apollo/pull/1946        
Apollo            nathandunn       Jbrowse 1.15                                                                                        https://github.com/GMOD/Apollo/pull/1928        
Apollo            nathandunn       JBrowse sync with 1.15.X                                                                            https://github.com/GMOD/Apollo/pull/1919        
Apollo            malcook          modify GFF3 export to (a) comport with GVF4.x conventions and (b) be VCF-ready                      https://github.com/GMOD/Apollo/pull/1495        
Apollo            nathandunn       Joss submit 1                                                                                       https://github.com/GMOD/Apollo/pull/1235        
cram-js           cmdcolin         Add binary parser test back into cram-js                                                            https://github.com/GMOD/cram-js/pull/3       
```

# Acknowledgment

Based on [kfatehi's gist](https://gist.github.com/kfatehi/ff12772c852da1fe8a2c88a5e3f1bfb3).