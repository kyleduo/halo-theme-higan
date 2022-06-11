<#include "module/macro.ftl">
<@layout title="${options.blog_title!}" keywords="${options.seo_keywords!}" description="${options.seo_description!}">
  <article id="links" class="post" itemscope itemtype="http://schema.org/BlogPosting">
    <div class="content">
        <@linkTag method="list">
            <#list links as link>
              <li>
                <a class="fir-image-figure" rel="noopener" target="_blank" href="${link.url!}">
                  <figure class="fir-imageover ">
                    <img class="fir-author-image fir-clickcircle" src="${link.logo!}"
                         alt="David East - Author">
                    <figcaption>
                      <div class="fig-author-figure-title">${link.name!}</div>
                      <div class="fig-author-figure-title">${link.description!}.</div>
                      <div class="fig-author-figure-title">Jan. 16th, 2017 &#8212; 5m read</div>
                    </figcaption>
                  </figure>
                </a>
              </li>
            </#list>
        </@linkTag>
    </div>
  </article>
</@layout>
