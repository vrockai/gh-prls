# gh-tools

## Install

`npm i gh-tools -g`

Tested with node v9.8.0.

## Usage

Set the `GITHUB_TOKEN` ENV variable to contain your personal access token (get your token on 
[https://github.com/settings/tokens](https://github.com/settings/tokens)), i.e.:
`export GITHUB_TOKEN="asdfrf234424d43d4d23"` if you want to access private repositories.

The `gh-tool --help` command should give you all the relevant information you need about the command itself.

### Examples

### gh-tools pr
Listing open PRs withing an organization:
```
$ gh-tools pr --owner GMOD
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

### gh-tools contributors
Listing new contributors of a specific repo since a specific date:
```
$ gh-tools contributors -o kiali -r kiali -s 2018-10-01T00:00:00.000Z
Login      Url                                     Contributor Since  Commit                                                                                   
---------  --------------------------------------  -----------------  -----------------------------------------------------------------------------------------
emmayang   https://api.github.com/users/emmayang   2018-10-22         https://api.github.com/repos/kiali/kiali/commits/fe7d120c4c59951c7f7cb99c6b52f5b2eb646524
matejgera  https://api.github.com/users/matejgera  2018-10-19         https://api.github.com/repos/kiali/kiali/commits/cd91678b27dc6e0f0bbe668957884a1269ab3d9a
bhavin192  https://api.github.com/users/bhavin192  2018-10-14         https://api.github.com/repos/kiali/kiali/commits/2b881d6d43767835640e3754e2787f609bac252f
hunchback  https://api.github.com/users/hunchback  2018-10-2          https://api.github.com/repos/kiali/kiali/commits/4343ee49e98fca0e6cf1738f5853c852ed4dc0cb
```

Listing new contributors of across all the repos in an organization since a specific date:
```
$ gh-tools contributors -o kiali -s 2018-10-01T00:00:00.000Z
Login         Url                                        Contributor Since  Commit                                                                                      
------------  -----------------------------------------  -----------------  --------------------------------------------------------------------------------------------
emmayang      https://api.github.com/users/emmayang      2018-10-22         https://api.github.com/repos/kiali/kiali/commits/fe7d120c4c59951c7f7cb99c6b52f5b2eb646524   
matejgera     https://api.github.com/users/matejgera     2018-10-19         https://api.github.com/repos/kiali/kiali/commits/cd91678b27dc6e0f0bbe668957884a1269ab3d9a   
bhavin192     https://api.github.com/users/bhavin192     2018-10-14         https://api.github.com/repos/kiali/kiali/commits/2b881d6d43767835640e3754e2787f609bac252f   
hunchback     https://api.github.com/users/hunchback     2018-10-2          https://api.github.com/repos/kiali/kiali/commits/4343ee49e98fca0e6cf1738f5853c852ed4dc0cb   
vanillaSlice  https://api.github.com/users/vanillaSlice  2018-10-5          https://api.github.com/repos/kiali/kiali-ui/commits/10a54ff7212cc870a374c445ce179ee343cef83e
clyang82      https://api.github.com/users/clyang82      2018-10-15         https://api.github.com/repos/kiali/kiali-ui/commits/c16c4db7ed2f33803d1d2bbcd8db6269ea03bedf

```

## Acknowledgment

Inspired by [kfatehi's gist](https://gist.github.com/kfatehi/ff12772c852da1fe8a2c88a5e3f1bfb3).